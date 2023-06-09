import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/api/users/entities";
import { AuthHelper } from "../auth.helper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('jwt.secret'),
            ignoreExpiration: false,
        });
    }

    private validate(payload: string): Promise<User | never> {
        return this.helper.validateUser(payload);
    }
}