/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { jwtConstants } from './temporary/jwtConstants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            // expiration verified by default
            const payload = await this.jwtService.verify(
                token,
                {
                    secret: jwtConstants.secret
                }
            )
            console.log(payload)
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['JwtUser'] = payload
        } catch (error) {
            // Handle specific JWT errors
            if (error instanceof Error) {
                throw new UnauthorizedException(
                    this.mapJwtErrorToMessage(error)
                )
            }
            throw new UnauthorizedException('Invalid token')
        }
        
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

    private mapJwtErrorToMessage(error: Error): string {
        switch (error.name) {
            case 'TokenExpiredError':
                return 'Token expired'
            case 'JsonWebTokenError':
                return 'Malformed token'
            case 'NotBeforeError':
                return 'Token not yet valid'
            default:
                return 'Invalid token'
        }
    }
}