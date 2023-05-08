import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { User } from "../users/entities";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "../refresh-tokens/entities";

@Injectable()
export class AuthHelper {
    constructor(
        private readonly jwt: JwtService,
    ) { }

    // Generate JWT Token
    public async generateJwtToken(user: User): Promise<string> {
        return this.jwt.signAsync({ id: user.id, email: user.email, userName: user.userName })
    }

    // Generate Refresh Token
    public generateRefreshToken(user: User, ipAddress: string) {
        return new RefreshToken(user, this.randomTokenString(), ipAddress);
    }

    // Validate User's password
    public async isPasswordValid(password: string, comparePassword: string): Promise<boolean> {
        return bcrypt.compare(password, comparePassword);
    }

    // Generate random token string
    public randomTokenString(): string {
        return crypto.randomBytes(40).toString('hex');
    }
}