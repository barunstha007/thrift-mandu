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
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonResponse } from 'src/common/common-response';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: createUserDto) {
    const userFound = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (userFound) throw new NotFoundException('Email Already Exists!');
    const createdUser = await this.userService.create(createUserDto);
    return new CommonResponse<User>(
      HttpStatus.OK,
      'User Created successfully',
      createdUser,
    );
  }

  @Get()
  async findAllUser() {
    const foundUser = await this.userService.findAllUser();
    return new CommonResponse<User[]>(
      HttpStatus.OK,
      'User Created successfully',
      foundUser,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.userService.findOne(id);
    return new CommonResponse<User>(
      HttpStatus.OK,
      'User Created successfully',
      foundUser,
    );
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userFound = await this.findOne(id);
    if (!userFound) throw new NotFoundException('User not found!');
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new CommonResponse<User>(
      HttpStatus.OK,
      'User updated successfully',
      updatedUser,
    );
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const userRemoved = await this.userService.remove(id);
    return new CommonResponse<User>(HttpStatus.OK, 'User Deleted successfully');
  }
}
