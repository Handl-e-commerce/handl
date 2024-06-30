import {v4 as uuidv4} from "uuid";
import {User} from "../db/models/User";
import {IUserDetails} from "../interfaces/IUserDetails";
import {IUserService} from "../interfaces/IUserService";
import * as argon2 from "argon2";
import {Vendor} from "../db/models/Vendor";
import {AuthToken} from "../db/models/AuthToken";
import {Op} from "sequelize";
import * as nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import {IGenericQueryResult} from "../interfaces/IGenericQueryResult";
import {EncryptionUtil} from "../utils/EncryptionUtil";

/**
 * User Service Class
 */
class UserService implements IUserService {
    private encryptionUtil: EncryptionUtil;

    /**
     * constructor where we inject services and utils
     */
    constructor() {
        this.encryptionUtil = new EncryptionUtil();
    }
    /**
     * Method to create a user in our database and sends generated token for user email verification
     * @param {IUserDetails} userDetails
     * @return {string} letting us know whether user was created or already exists in database
     */
    public async CreateUser(userDetails: IUserDetails): Promise<IGenericQueryResult> {
        try {
            const userId = uuidv4().toString();

            const userExists: User | null = await User.findOne({
                where: {
                    email: userDetails.email,
                },
            });

            const hashedPassword: string = await argon2.hash(userDetails.password);
            const token: string = this.GenerateToken(128);
            const hashedToken: string = await argon2.hash(token);
            const encryptedEIN = this.encryptionUtil.EncryptData(userDetails.EIN.toString());
            const publicEIN: string = userDetails.EIN.toString().slice(5, 9);

            if (!userExists) {
                await User.create({
                    uuid: userId,
                    email: userDetails.email,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    businessName: userDetails.businessName,
                    EIN: encryptedEIN,
                    publicEIN: publicEIN,
                    phoneNumber: userDetails.phoneNumber,
                    address: userDetails.address,
                    city: userDetails.city,
                    state: userDetails.state,
                    zipcode: userDetails.zipcode,
                    categories: userDetails.categories,
                    password: hashedPassword,
                    savedVendors: [],
                    isVerified: false,
                    verificationToken: hashedToken,
                    tokenExpiration: new Date(Date.now() + 1000*60*30),
                });

                this.GenerateVerificationEmail(userDetails.firstName, userId, token, userDetails.email);

                return {
                    id: userId,
                    message: `Created new user with id: ${userId}`,
                };
            } else {
                throw new Error("User already exists in database.");
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    /**
   * Returns a user based on userId
   * @param {string} userId
   * @return {Promise<User>}
   */
    public async GetUserByUserId(userId: string): Promise<User> {
        try {
            const user: User | null = await User.findOne({
                where: {
                    uuid: userId,
                },
            });

            if (!user) {
                throw new Error(`No users with id: ${userId} found.`);
            }
            return user;
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
     * Get list of Vendors based on user's saved vendors
     * @param {string} userId
     * @return {Vendor[]}
     */
    public async GetSavedVendors(userId: string): Promise<Vendor[]> {
        try {
            const usersSavedVendors = await User.findOne({
                where: {
                    uuid: userId,
                },
                attributes: ["savedVendors"],
            });

            if (!usersSavedVendors) {
                return [];
            }

            const savedVendors = await Vendor.findAll({
                where: {
                    name: {
                        [Op.and]: usersSavedVendors.savedVendors,
                    },
                },
                attributes: ["name", "uuid"],
            });

            return savedVendors;
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    // TODO: (HIGH) Implement password reset and fraud prevention logic and email
    /**
   * Updates user password
   * @param {string} userId
   * @param {string} newPassword
   * @return {Promise<IGenericQueryResult>}
   */
    public async ResetUserPassword(
        userId: string,
        newPassword: string
    ): Promise<IGenericQueryResult> {
        try {
            // need to send confirmation email saying you just changed your password and
            // add necessary steps for case of fraud
            const user: User | null = await User.findOne({
                where: {
                    uuid: userId,
                },
            });

            if (user === null || user === undefined) {
                throw new Error("Could not find user with associated user id");
            }

            const hashedPassword: string = await argon2.hash(newPassword);

            await User.update({
                password: hashedPassword,
            }, {
                where: {
                    uuid: userId,
                },
            });

            // Send email saying you've just updated your password, if this wasn't you click here
            // Figure out logic for handling fraud prevention

            return {
                id: userId,
                message: `Successfully updated password of user ${userId}`,
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    // TODO: (HIGH) Create deletion confirmation email
    /**
   * Soft deletes a user from the DB
   * @param {string} userId
   * @return {Promise<IGenericQueryResult>}
   */
    public async DeleteUser(userId: string): Promise<IGenericQueryResult> {
        try {
            await User.destroy({
                where: {
                    uuid: userId,
                },
            });
            return {
                id: userId,
                message: `Successfully soft-deleted user ${userId}.`,
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
     * Login method so that user can login and get long term session cookies in return
     * @param {string} email
     * @param {string} password
     */
    public async Login(email: string, password: string): Promise<{
        result: boolean,
        selector?: string | null,
        validator?: string | null,
        userId?: string,
        expires?: Date | null
    }> {
        try {
            const user: User | null = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (user === null || user === undefined) {
                return {
                    result: false,
                };
            }

            if (!(await argon2.verify(user.password, password))) {
                return {
                    result: false,
                };
            }

            const selector = uuidv4().toString();
            const validator = uuidv4().toString();
            const hashedValidator: string = await argon2.hash(validator);
            const expirationDate = new Date(Date.now()+1000*60*60*24*90);

            await AuthToken.create({
                selector: selector,
                validator: hashedValidator,
                UserUuid: user.uuid,
                expires: new Date(expirationDate),
            });

            return {
                result: true,
                selector: selector,
                validator: validator,
                userId: user.uuid,
                expires: expirationDate,
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
     * Logs the user out and deletes the user's info from AuthToken table
     * @param {string} selector
     */
    public async Logout(selector: string): Promise<void> {
        try {
            console.log("Logging user out and deleting tokens.");
            const rowsAffected = await AuthToken.destroy({
                where: {
                    selector: selector,
                },
            });
            console.log(`Number of rows deleted: ${rowsAffected}`);
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
   * Method to verify that the user's long term log in cookies are still valid and user can be logged in
   * Is also used to verify that user has access to user actions such as My Account, etc.
   * If false, then cookies will be deleted from client side.
   * @param {string} selector
   * @param {string} validator
   * @param {string} userId
   * @return {Promise<boolean>}
   */
    public async VerifyUser(selector: string, validator: string, userId: string): Promise<boolean> {
        try {
            const auth: AuthToken | null = await AuthToken.findOne({
                where: {
                    selector: selector,
                },
            });

            if (auth === null) {
                return false;
            }

            if (!(await argon2.verify(auth.validator, validator))) {
                return false;
            }

            if (userId != auth.UserUuid) {
                return false;
            }

            return true;
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
   * Verifies that the token the user pass after clicking verification link from email is valid
   * @param {string} userId
   * @param {string} token
   * @return {boolean}
   */
    public async VerifyRegistrationToken(userId: string, token: string): Promise<{
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
                    message: "The email does not exist.",
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
                this.GenerateVerificationEmail(user.firstName, userId, token, user.email);
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
    private GenerateToken(n: number): string {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let token = "";
        for (let i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    /**
   * Utility method meant for just sending a verification email to a user
   * @param {string} name
   * @param {string} userId
   * @param {string} token
   * @param {string} email
   */
    private GenerateVerificationEmail(name: string, userId: string, token: string, email: string): void {
        const verificationLink: string = process.env.NODE_ENV === "development" ?
            `http://localhost:3000/verify?token=${token}&userId=${userId}` :
            process.env.VERIFICATION_LINK + `/verify?token=${token}&userId=${userId}`;

        const fruadPreventionLink: string = process.env.NODE_ENV === "development" ?
            `http://localhost:3000/cancel-registration/?userId=${userId}` :
            process.env.VERIFICATION_LINK + `/cancel-registration/?userId=${userId}`;

        const __dirname = "../backend/email-templates";
        const filePath = path.join(__dirname, "../emails/password-reset.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
            verificationLink: verificationLink,
            fruadPreventionLink: fruadPreventionLink,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team",
            to: email,
            subject: "Please verify your email - The Handl Team",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "support@thehandl.com",
                pass: process.env.ZOHO_MAIL_PASSWORD as string,
            },
        });

        transporter.sendMail(mailOptions, (err, res)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully: ", res);
            }
        });
    }
}

export {UserService};
