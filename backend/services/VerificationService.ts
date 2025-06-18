import {IVerificationService} from "../interfaces/IVerificationService";
import {AuthToken} from "../db/models/AuthToken";
import {User} from "../db/models/User";
import * as argon2 from "argon2";
import {EmailService} from "./EmailService";
import {PlanType} from "../enums/PlanType";

/** Verification Service Class */
class VerificationService implements IVerificationService {
    private emailService: EmailService;

    /**
     * constructor where we inject services and utils
     */
    constructor() {
        this.emailService = new EmailService();
    }

    /**
     * Verifies that the token recieved from the ReCaptcha service is from a human and not a bot
     * by calculating the score that the user is a human
     * @param {string} token
     * @return {boolean} success boolean that lets us know that user is a human or not
     */
    public async VerifyCaptcha(token: string): Promise<boolean> {
        try {
            const verificationUrl = `
            https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}
            `;
            const httpOptions: RequestInit = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            };
            const response = await fetch(verificationUrl, httpOptions);
            const data = await response.json();
            return data.success;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    /**
   * Method to verify that the user's long term log in cookies are still valid and user can be logged in
   * Is also used to verify that user has access to user actions such as My Account, etc.
   * If false, then cookies will be deleted from client side.
   * @param {string | undefined} selector
   * @param {string | undefined} validator
   * @param {string} userId
   * @return {Promise<boolean>}
   */
    public async VerifyUser(
        selector: string | undefined,
        validator: string | undefined,
        userId: string
    ): Promise<{
        result: boolean,
        planType?: string,
        subscriptionExpirationDate?: Date | null,
    }> {
        try {
            if (!selector || !validator) {
                return {
                    result: false,
                };
            }

            const auth = await AuthToken.findOne({
                where: {
                    selector: selector,
                },
                include: [{
                    model: User,
                    as: "User",
                    where: {
                        uuid: userId,
                    },
                    attributes: ["planType", "subscriptionExpiresAt"],
                    required: true, // ensures LEFT JOIN (set to false for OUTER JOIN)
                }],
            }) as (AuthToken & { User: User }) | null;
            if (auth === null) {
                return {result: false};
            }

            if (!(await argon2.verify(auth.validator, validator))) {
                return {result: false};
            }

            if (userId != auth.UserUuid) {
                return {result: false};
            }

            let planType = auth.User.planType;
            // If the user's subsctription has expired, write to the DB that the user is no longer a premium user
            if (auth.User.subscriptionExpiresAt && new Date(Date.now()) > auth.User.subscriptionExpiresAt) {
                await User.update({
                    planType: PlanType[0],
                }, {
                    where: {
                        uuid: userId,
                    },
                });
                planType = PlanType[0];
            }

            return {
                result: true,
                planType: planType,
                subscriptionExpirationDate: auth.User.subscriptionExpiresAt,
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
     * Verifies that the token the user pass after clicking verification link from email is valid
     * @param {string} userId
     * @param {string} token
     * @param {string} isPasswordReset
     * @return {boolean}
     */
    public async VerifyToken(userId: string, token: string, isPasswordReset: boolean): Promise<{
        result: boolean,
        message: string,
    }> {
        try {
            const user: User | null = await User.findOne({
                where: {
                    uuid: userId,
                },
            });
            if (user === null || user === undefined) {
                return {
                    result: false,
                    message: "Something went wrong. Please try again later.",
                };
            }

            if (user.isVerified && !isPasswordReset) {
                return {
                    result: true,
                    message: "Your email is already verified.",
                };
            }

            if (!user.verificationToken) {
                return {
                    result: false,
                    message: "Verification token does not exist. Please request for a new one to be sent to you.",
                };
            }

            if (Date.now() > Number(user.tokenExpiration)) {
                return {
                    result: false,
                    message: "The verification token has expired. Please request for a new one to be sent to you.",
                };
            }

            if (!(await argon2.verify(user.verificationToken, token))) {
                return {
                    result: false,
                    message: "The verification token is not valid. Please request for a new one to be sent to you.",
                };
            }

            await User.update({
                isVerified: true,
                verificationToken: undefined,
                tokenExpiration: undefined,
            }, {
                where: {
                    uuid: userId,
                },
            });

            return {
                result: true,
                message: "Successfully verified email.",
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
   * Utility method to very quickly send new access token to verify email account
   * @param {string} userId
   */
    public async SendNewVerificationToken(userId: string): Promise<void> {
        try {
            const token = this.GenerateToken(128);
            await User.update({
                verificationToken: token,
                tokenExpiration: new Date(Date.now() + 1000*60*30),
            }, {
                where: {
                    uuid: userId,
                },
            });

            const user: User | null = await User.findOne({
                where: {
                    uuid: userId,
                },
            });

            if (user) {
                this.emailService.GenerateVerificationEmail(user.firstName, userId, token, user.email);
            }
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
   * Generates a random security token used for verification
   * @param {number} n
   * @return {string}
   */
    public GenerateToken(n: number): string {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let token = "";
        for (let i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }
}

export {VerificationService};
