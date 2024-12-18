import {User} from "../db/models/User";
import {IGenericQueryResult} from "./IGenericQueryResult";
import {IUserDetails} from "./IUserDetails";

interface IUserService {
    CreateUser: (userDetails: IUserDetails) => Promise<IGenericQueryResult>;
    GetUserByUserId: (userId: string) => Promise<User>;
    GetSavedVendors: (userId: string) => Promise<string[]>;
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
        firstName?: string | null
    }>;
    SaveVendors: (vendorIds: string[], userId: string) => Promise<void>
}

export {IUserService};
