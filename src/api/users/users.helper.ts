import { Injectable } from "@nestjs/common";
import { User } from "./entities";
import { IUserRO } from "./users.interface";

@Injectable()
export class UsersHelper {
    
    buildUserRO(user: User) {
        const userRO: IUserRO = {
            id: user.id
        }

        return {
            user: userRO
        }
    }
}