import {v4 as uuidv4} from "uuid";
import {User} from "../db/models/User";
import {IUserDetails} from "../interfaces/IUserDetails";
import {IUserService} from "../interfaces/IUserService";
import * as argon2 from "argon2";
import {AuthToken} from "../db/models/AuthToken";
import {IGenericQueryResult} from "../interfaces/IGenericQueryResult";
import {EmailService} from "./EmailService";
import {VerificationService} from "./VerificationService";
import {Vendor} from "../db/models/Vendor";
import {QueryTypes} from "sequelize";
import {Database} from "../db/Database";

/**
 * User Service Class
 */
class UserService implements IUserService {
    private emailService: EmailService;
    private verificationService: VerificationService;

    /**
     * constructor where we inject services and utils
     */
    constructor() {
        this.emailService = new EmailService();
        this.verificationService = new VerificationService();
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
            const token: string = this.verificationService.GenerateToken(128);
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
                    type: "free", // Default type is free, can be changed later
                    subscriptionExpiresAt: null,
                });

                this.emailService.GenerateVerificationEmail(userDetails.firstName, userId, token, userDetails.email);

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
     * @return {string[]}
     */
    public async GetSavedVendors(userId: string): Promise<Vendor[]> {
        try {
            // Wrote a raw query because it's more efficient than using sequelize's ORM logic
            return await Database.GetInstance().sequelize.query(
                `
                    SELECT 
                        uuid,
                        name,
                        description,
                        website,
                        categories,
                        subcategories,
                        people,
                        address,
                        city,
                        state,
                        zipcode,
                        phone_number,
                        email
                    FROM public."Vendors"
                    WHERE uuid IN (
                        SELECT UNNEST("saved_vendors") FROM public."Users"
                        WHERE uuid = :userId
                    );
                `,
                {
                    replacements: {
                        userId: userId,
                    },
                    type: QueryTypes.SELECT,
                },
            );
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
                verificationToken: null,
                tokenExpiration: null,
            }, {
                where: {
                    uuid: userId,
                },
            });

            this.emailService.GeneratePasswordResetConfirmationEmail(user.firstName, user.email);

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

            const token = this.verificationService.GenerateToken(128);
            const hashedToken: string = await argon2.hash(token);
            await user.update({
                verificationToken: hashedToken,
                tokenExpiration: new Date(Date.now() + 1000*60*30),
            }, {
                where: {
                    email: email,
                },
            });
            this.emailService.GeneratePasswordResetEmail(user.firstName, user.email, user.uuid, token);
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

            this.emailService.GenerateDeletionConfirmationEmail(user.firstName, user.email);

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
        firstName?: string | null,
        type?: string | null,
        subscriptionExpiresDate?: Date | null,
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
                type: user.type,
                subscriptionExpiresDate: user.subscriptionExpiresAt,
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
     * Updates the list of saved vendors for users favorited vendors
     * @param {string[]} vendorIds
     * @param {string} userId
     */
    public async SaveVendors(vendorIds: string[], userId: string) {
        try {
            await User.update({
                savedVendors: vendorIds,
            }, {
                where: {
                    uuid: userId,
                },
            });
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }

    /**
     * Utility method to send us the emails that users will write to submit to us
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} message
     */
    public async SendSupportMessage(
        firstName: string,
        lastName: string,
        email: string,
        message: string,
    ): Promise<void> {
        try {
            this.emailService.GenerateSupportEmail(firstName, lastName, email, message);
        } catch (err) {
            const error = err as Error;
            throw Error(error.message);
        }
    }
}

export {UserService};
