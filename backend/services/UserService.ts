import {v4 as uuidv4} from "uuid";
import {User} from "../db/models/User";
import {IUserDetails} from "../interfaces/IUserDetails";
import {IUserService} from "../interfaces/IUserService";
import * as argon2 from "argon2";
import { Vendor } from "../db/models/Vendor";

/**
 * User Service Class
 */
class UserService implements IUserService {
    /**
     * Method to create a user in our database and sends generated token for user email verification
     * @param {IUserDetails} userDetails
     * @return {string} letting us know whether user was created or already exists in database
     */
    public async CreateUser(userDetails: IUserDetails): Promise<string> {
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
            const hashedEIN: string = await argon2.hash(userDetails.EIN.toString());
            const publicEIN: string = userDetails.EIN.toString().slice(5, 9);

            if (!userExists) {
                await User.create({
                    uuid: userId,
                    email: userDetails.email,
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    businessName: userDetails.businessName,
                    EIN: hashedEIN,
                    publicEIN: publicEIN,
                    phoneNumber: userDetails.phoneNumber,
                    address: userDetails.address,
                    state: userDetails.state,
                    zipcode: userDetails.zipcode,
                    categories: userDetails.categories,
                    password: hashedPassword,
                    savedVendors: [],
                    isVerified: false,
                    verificationCode: hashedToken,
                });

                return "Created user.";
            } else {
                throw new Error("User already exists in database.");
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }


    // TODO: (HIGH) Implement the following methods
    public async GetUserByUserId(userId: string): Promise<User> {
        try {

        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    public async GetSavedVendors(userId: string): Promise<Vendor[]> {
        try {
            
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    };

    public async UpdateUserPassword(
        userId: string,
        oldPassword: string,
        newPassword: string
    ): Promise<string> {
        try {
            return "foo";
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    };


    public async DeleteUser(userId: string): Promise<string> {
        try {
            return "foo"
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    };

    public async Login(email: string, password: string): Promise<{
        result: boolean,
        selector?: string | null,
        validator?: string | null,
        expires?: Date | null
    }> {
        try {
            
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    };

    public async VerifyUser(selector: string, validator: string, userId: string): Promise<boolean> {
        try {
            // default everyone is unverified. Trust but verify.
            return false;   
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    };

    public async VerifyRegistrationToken(userId: string, token: string): Promise<{
        result: boolean,
        message: string,
    }> {
        try {
            // default everyone is unverified. Trust but verify.
            return {
                result: false,
                message: "We weren't able to verify your registration token."
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
        const user: User | null = await User.findOne({
            where: {
            id: userId,
            },
        });

        if (user) {
            this.GenerateEmail(userId, token, user.email);
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
   * @param {string} userId
   * @param {string} token
   * @param {string} email
   */
    private GenerateEmail(userId: string, token: string, email: string): void {
        const verificationLink: string = process.env.NODE_ENV === "development" ?
        `http://localhost:3000/verify?token=${token}&userId=${userId}` :
        process.env.VERIFICATION_LINK + `/verify?token=${token}&userId=${userId}`;

        const mailOptions = {
        from: "support@thehandl.com",
        to: email,
        subject: "Please verify your email - The Handl Team",
        replyTo: "support@thehandl.com",
        // TODO: (MEDIUM) Create fraud prevention link which deletes any registered account from DB
        html: createEmailTemplate(verificationLink, ""),
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

        transporter.sendMail(mailOptions, ( err, res)=>{
        if (err) {
            console.log(err);
        } else {
            console.log("The email was sent successfully: ", res);
        }
        });
    }
}

export {UserService};
