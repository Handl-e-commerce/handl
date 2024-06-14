import {User} from "../db/models/User";
import {IUserDetails} from "./IUserDetails";

interface IUserService {
    CreateUser: (userDetails: IUserDetails) => Promise<User>;
    GetUserByUserId: (userId: string) => Promise<User>;
}

export {IUserService};
