/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {
    const SALT_ROUNDS = 10;
    this.usersService.create(new CreateUserDto({username : "maria", email : "maria@yc.com", password : bcrypt.hashSync('guess', SALT_ROUNDS)}))
  }
}
