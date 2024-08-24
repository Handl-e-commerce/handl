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
// TODO: (HIGH) Figure out what to do with Encryption Util
// import {EncryptionUtil} from "../utils/EncryptionUtil";

/**
 * User Service Class
 */
class UserService implements IUserService {
    // private encryptionUtil: EncryptionUtil;

    /**
     * constructor where we inject services and utils
     */
    constructor() {
        // this.encryptionUtil = new EncryptionUtil();
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

            if (!userExists) {
                await User.create({
                    uuid: userId,
                    email: userDetails.email,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    businessName: userDetails.businessName,
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
                verificationToken: undefined,
                tokenExpiration: undefined,
            }, {
                where: {
                    uuid: userId,
                },
            });

            this.GeneratePasswordResetConfirmationEmail(user.firstName, user.email);

            return {
                id: userId,
                message: `Successfully updated password of user ${userId}`,
            };
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }


    /**
     * Creates a secure link for a user to change their passowrd,
     * email will be sent to them in order to change the password
     * @param {stirng} email
     */
    public async RequestUserPasswordReset(email: string): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error("User does not exist.");
            }

            const token = this.GenerateToken(128);
            const hashedToken: string = await argon2.hash(token);
            await user.update({
                verificationToken: hashedToken,
                tokenExpiration: new Date(Date.now() + 1000*60*30),
            }, {
                where: {
                    email: email,
                },
            });
            this.GeneratePasswordResetEmail(user.firstName, user.email, user.uuid, token);
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
   * Soft deletes a user from the DB
   * @param {string} userId
   * @return {Promise<IGenericQueryResult>}
   */
    public async DeleteUser(userId: string): Promise<IGenericQueryResult> {
        try {
            const user = await User.findOne({
                where: {
                    uuid: userId,
                },
            });

            if (!user) {
                throw new Error("User does not exist, cannot delete.");
            }

            await User.destroy({
                where: {
                    uuid: userId,
                },
            });

            this.GenerateDeletionConfirmationEmail(user.firstName, user.email);

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
        expires?: Date | null,
        firstName?: string | null
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
                firstName: user.firstName,
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

    // TODO: (LOW) Refactor these methods into utility class called EmailService
    /**
   * Utility method meant for just sending a verification email to a user
   * @param {string} name
   * @param {string} userId
   * @param {string} token
   * @param {string} email
   */
    private GenerateVerificationEmail(name: string, userId: string, token: string, email: string): void {
        const url = process.env.NODE_ENV === "local_dev" ? "http://localhost:3000" : process.env.VERIFICATION_LINK;
        const verificationLink: string = url + `/verify?token=${token}&userId=${userId}`;
        const fraudPreventionLink: string = url + `/cancel-registration/?userId=${userId}`;
        const filePath = path.resolve("../backend/email-templates/VerifyEmail/VerifyEmail.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
            verificationLink: verificationLink,
            fraudPreventionLink: fraudPreventionLink,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Please verify your email - The Handl Team",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("../backend/email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
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

    /**
     * Utility method meant for sending a secure email letting them know that we've successfully reset their password
     * @param {string} name
     * @param {string} email
     */
    private GeneratePasswordResetConfirmationEmail(name: string, email: string): void {
        // eslint-disable-next-line
        const filePath = path.resolve("../backend/email-templates/PasswordResetConfirmation/PasswordResetConfirmation.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Password Reset Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("../backend/email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
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

    /**
     * Utility method meant for sending a secure email and link to let a uer reset their password
     * @param {string} name
     * @param {string} email
     * @param {string} userId
     * @param {string} token
     */
    private GeneratePasswordResetEmail(name: string, email: string, userId: string, token: string): void {
        const filePath = path.resolve("../backend/email-templates/ResetPassword/ResetPassword.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const url = process.env.NODE_ENV === "local_dev" ? "http://localhost:3000" : process.env.VERIFICATION_LINK;
        const verificationLink: string = url + `/reset/redirect?token=${token}&userId=${userId}`;

        const replacements = {
            name: name,
            verificationLink: verificationLink,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Password Reset Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("../backend/email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
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

    /**
     * Utility method meant for sending a secure email letting the user know we've deleted their account
     * @param {string} name
     * @param {string} email
     */
    private GenerateDeletionConfirmationEmail(name: string, email: string): void {
        const filePath = path.resolve("../backend/email-templates/DeletionConfirmation/DeletionConfirmation.html");
        const source = fs.readFileSync(filePath, "utf-8").toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: name,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
            from: "The Handl Team <support@thehandl.com>",
            to: email,
            subject: "Account Deletion Confirmation - Handl",
            replyTo: "support@thehandl.com",
            html: htmlToSend,
            attachments: [{
                filename: "handl-email-logo-narrow.png",
                path: path.resolve("../backend/email-templates/handl-email-logo-narrow.png"),
                cid: "companyLogo",
            }],
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
