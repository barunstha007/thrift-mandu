import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserService } from './../user/user.service';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { UserInterface } from 'src/user/user.interface';
import { CommonResponse } from 'src/common/common-response';
import { LoginDto } from './dto/login.dto';
import { AdminResInterface } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log("i am in login api")
    const user = await this.authService.login(body); 
    console.log({user})
    if (user) {
      return user
    }
  }

  @Post('register')
  async create(@Body() createUserDto: createUserDto) {
   
    const userCreated = await this.authService.register(createUserDto);
    if (userCreated) {
      return new CommonResponse<UserInterface>(
        HttpStatus.OK,
        'User Created successfully',
        userCreated,
      );
    }
  }
}
