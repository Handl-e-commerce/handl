import {User} from "../db/models/User";
import {Vendor} from "../db/models/Vendor";
import {IUserDetails} from "./IUserDetails";

interface IUserService {
    CreateUser: (userDetails: IUserDetails) => Promise<User>;
    GetUserByUserId: (userId: string) => Promise<User>;
    Login: () => Promise<void>;
    VerifyUser: () => Promise<void>;
    UpdatePassword: () => Promise<void>;
    GetSavedVendors: (userId: string) => Promise<Vendor[]>;
}

export {IUserService};
