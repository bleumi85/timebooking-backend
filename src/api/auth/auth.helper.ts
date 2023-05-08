import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class AuthHelper {

    // Validate User's password
    public async isPasswordValid(password: string, comparePassword: string): Promise<boolean> {
        return bcrypt.compare(password, comparePassword);
    }
}