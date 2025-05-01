import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    
    async signIn(username: string, pass: string): Promise<{ access_token: string }> {

        const user = await this.usersService.findByUsername(username)

        if(!user) throw new UnauthorizedException("User can't be found.")

        if (!this.comparePasswords(pass, user.password)) {
            throw new UnauthorizedException("Invalid password.")
        }

        const payload = { 
            sub: user.id, 
            username: user.username, 
            admin : false, 
            iss: 'your-issuer-name' 
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    comparePasswords(plainPassword: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashedPassword)
    }
}