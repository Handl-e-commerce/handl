import {Request, Response, NextFunction} from "express";
import {IUserDetails} from "../interfaces/IUserDetails";
import {UserService} from "../services/UserService";
import {VerificationService} from "../services/VerificationService";
import {IGenericQueryResult} from "../interfaces/IGenericQueryResult";
import {User} from "../db/models/User";
import {Vendor} from "../db/models/Vendor";

/**
 * User Controller Class
 * Handles requests related to users.
 * @param {Response} res - The response object.
 * @class UserController
 */
class UserController {
    private unathenticatedResponse = (res: Response) => res.status(401)
        .cookie("selector", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
        .cookie("validator", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
        .cookie("userId", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
        .cookie("planType", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
        .cookie("loggedIn", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
        .cookie("firstName", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
        .send();

    /**
     * Registers a new user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async CreateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userDetails: IUserDetails = req.body;
            const userService: UserService = new UserService();
            const result: IGenericQueryResult = await userService.CreateUser(userDetails);
            return res.status(201).json({message: result.message});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Gets the current users details
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async GetMe(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const verificationService = new VerificationService();
            const verificationStatus = await verificationService.VerifyUser(
                cookies.selector,
                cookies.validator,
                cookies.userId
            );
            if (!verificationStatus.result) {
                return this.unathenticatedResponse(res);
            }
            const userService = new UserService();
            const user: User = await userService.GetUserByUserId(cookies.userId);
            return res.status(200).json({user});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Gets the current user's saved vendors
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async GetMeVendors(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const verificationService = new VerificationService();
            const verificationStatus = await verificationService.VerifyUser(
                cookies.selector,
                cookies.validator,
                cookies.userId
            );
            if (!verificationStatus.result) {
                return this.unathenticatedResponse(res);
            }
            const userService = new UserService();
            const savedVendors: Vendor[] = await userService.GetSavedVendors(cookies.userId);
            return res.status(200).json({savedVendors});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Updates a user's password
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async UpdatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userService = new UserService();
            const result: IGenericQueryResult = await userService.ResetUserPassword(
                req.params.id,
                req.body.newPassword
            );
            return res.status(201).json({message: result});
        } catch (err: unknown) {
            res.status(401).json({message: (err as Error).message});
            return next(err as Error);
        }
    }

    /**
     * Verifies a password reset token
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async VerifyPasswordResetToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userId: string = req.body.userId;
            const token: string = req.body.token;
            const verificationService = new VerificationService();
            const verificationResult = await verificationService.VerifyToken(userId, token, true);
            if (verificationResult.result) {
                return res.status(201).json({message: verificationResult.message});
            } else {
                return res.status(401).json({message: verificationResult.message});
            }
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Requests a password reset email
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async RequestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const email: string = req.body.email as string;
            const userService = new UserService();
            await userService.RequestUserPasswordReset(email);
            return res.status(201).send();
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Logs in a user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async Login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userDetails = req.body;
            const userService = new UserService();
            const loginStatus = await userService.Login(userDetails.email, userDetails.password);
            if (loginStatus.result) {
                const expiration = new Date(Date.now() + (1000*60*60*24*90)); // 90 days
                return res.status(201)
                    .cookie(
                        "selector",
                        loginStatus.selector,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: true,
                        }
                    )
                    .cookie(
                        "validator",
                        loginStatus.validator,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: true,
                        }
                    )
                    .cookie(
                        "userId",
                        loginStatus.userId,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: true,
                        }
                    )
                    .cookie(
                        "planType",
                        loginStatus.planType,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: false,
                        }
                    )
                    .cookie(
                        "loggedIn",
                        true,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: false,
                        }
                    )
                    .cookie(
                        "firstName",
                        loginStatus.firstName,
                        {
                            expires: expiration,
                            sameSite: "none",
                            secure: true,
                            httpOnly: false,
                        }
                    )
                    .json({message: "Successfully authenticated user"});
            } else {
                return res.status(401).json({message: "Unable to authenticate user"});
            }
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Logs out a user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async Logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const userService = new UserService();
            await userService.Logout(cookies.selector);
            return res.status(201)
                .cookie("selector", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
                .cookie("validator", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
                .cookie("userId", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: true})
                .cookie("planType", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
                .cookie("loggedIn", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
                .cookie("firstName", "", {maxAge: Number(new Date(1)), sameSite: "none", secure: true, httpOnly: false})
                .send();
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Verifies a registration token
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async VerifyRegistrationToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userId: string = req.body.userId;
            const token: string = req.body.token;
            const verificationService = new VerificationService();
            const verificationResult = await verificationService.VerifyToken(userId, token, false);
            if (verificationResult.result) {
                return res.status(201).json({message: verificationResult.message});
            } else {
                return res.status(401).json({message: verificationResult.message});
            }
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Requests a new registration verification token
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async RequestNewRegistrationToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userId: string = req.body.userId;
            const verificationService = new VerificationService();
            await verificationService.SendNewVerificationToken(userId);
            return res.status(201).send();
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Soft deletes a user
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async DeleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const verificationService = new VerificationService();
            const verificationStatus = await verificationService.VerifyUser(
                cookies.selector,
                cookies.validator,
                cookies.userId
            );
            if (verificationStatus.result) {
                return this.unathenticatedResponse(res);
            }
            const userId: string = req.params.id;
            const userService = new UserService();
            const result: IGenericQueryResult = await userService.DeleteUser(userId);
            return res.status(200).json({id: result.id, message: result.message});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Handles contact form submissions
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async Contact(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const firstName: string = req.body.firstName;
            const lastName: string = req.body.lastName;
            const email: string = req.body.email;
            const message: string = req.body.message;
            const userService = new UserService();
            await userService.SendSupportMessage(firstName, lastName, email, message);
            return res.status(201).send();
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Verifies Google reCAPTCHA token
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async VerifyRecaptcha(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const token: string = req.body.token;
            const verificationService = new VerificationService();
            const success = await verificationService.VerifyCaptcha(token);
            return res.status(201).json({success});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Saves the user's favorite vendors
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof UserController
     * @async
     */
    async SaveVendors(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const verificationService = new VerificationService();
            const verificationStatus = await verificationService.VerifyUser(
                cookies.selector,
                cookies.validator,
                cookies.userId
            );
            if (!verificationStatus.result) {
                return this.unathenticatedResponse(res);
            }
            const vendorIds: string[] = req.body.vendorIds;
            const userService = new UserService();
            await userService.SaveVendors(vendorIds, cookies.userId);
            return res.status(204).send();
        } catch (err: unknown) {
            return next(err as Error);
        }
    }
}

export default new UserController();
