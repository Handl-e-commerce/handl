import {User} from "../db/models/User";
import {Vendor} from "../db/models/Vendor";
import {IUserDetails} from "./IUserDetails";

interface IUserService {
    CreateUser: (userDetails: IUserDetails) => Promise<string>;
    GetUserByUserId: (userId: string) => Promise<User>;
    GetSavedVendors: (userId: string) => Promise<Vendor[]>;
    UpdateUserPassword: (
        userId: string,
        oldPassword: string,
        newPassword: string
    ) => Promise<string>;
    DeleteUser: (userId: string) => Promise<string>;
    Login: (email: string, password: string) => Promise<{
        result: boolean,
        selector?: string | null,
        validator?: string | null,
        expires?: Date | null
    }>;
    VerifyUser: (selector: string, validator: string, userId: string) => Promise<boolean>;
    VerifyRegistrationToken: (userId: string, token: string) => Promise<{
        result: boolean,
        message: string
    }>;
}

export {IUserService};
