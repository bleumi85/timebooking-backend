import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "./entities";
import { Role } from "./users.interface";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }

    matchRoles(roles: Role[], userRole: Role) {
        return roles.some((role) => role === userRole);
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        if (!roles.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        return this.matchRoles(roles, user.role);
    }
}