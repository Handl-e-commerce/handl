import {User} from "../db/models/User";
import {Vendor} from "../db/models/Vendor";
import {IGenericQueryResult} from "./IGenericQueryResult";
import {IUserDetails} from "./IUserDetails";

interface IUserService {
    CreateUser: (userDetails: IUserDetails) => Promise<IGenericQueryResult>;
    GetUserByUserId: (userId: string) => Promise<User>;
    GetSavedVendors: (userId: string) => Promise<Vendor[]>;
    ResetUserPassword: (
        userId: string,
        newPassword: string
    ) => Promise<IGenericQueryResult>;
    DeleteUser: (userId: string) => Promise<IGenericQueryResult>;
    Login: (email: string, password: string) => Promise<{
        result: boolean,
        selector?: string | null,
        validator?: string | null,
        expires?: Date | null
    }>;
    VerifyUser: (selector: string, validator: string, userId: string) => Promise<boolean>;
    VerifyToken: (userId: string, token: string, isPasswordReset: boolean) => Promise<{
        result: boolean,
        message: string
    }>;
}

export {IUserService};
