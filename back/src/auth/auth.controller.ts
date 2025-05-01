import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {

        const { username, password } = signInDto
        
        if(!username || !password) {
            // will respond with a 400 Bad Request
            throw new BadRequestException('Username and password are required')
        }
        
        return this.authService.signIn(username, password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req : {user : string}) : Promise<User> { // @Request() req : {user: string} set by middleware / guard
          const username = req.user

          if(!username) {
            throw new BadRequestException('Missing required request parameter: user');
          }

          const user = await this.usersService.findByUsername(username)
          if(!user) {
            throw new NotFoundException(`User named ${username} not found`)
          }

          return user
    }

    @UseGuards(AuthGuard)
    @Get('test')
    getTest(@Body() testDto : {user: string}) : string{
        return testDto.user
    }
}
