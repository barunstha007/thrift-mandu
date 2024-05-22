import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserInterface } from 'src/user/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(
    username: string,
    password: string,
  ): Promise<UserInterface> {
    const user = await this.userRepository.findOneBy({ username: username });
    const verifyPassword = await bcrypt.compare(password, user?.password);
    if (user && verifyPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const { email, password } = user;
    const checkUserExists = await this.userRepository.findOneBy({ email });
    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const verifyPassword = await bcrypt.compare(
      password,
      checkUserExists?.password,
    );
    if (verifyPassword) {
      const accessToken = this.generateJWT({
        sub: checkUserExists.id,
        name: checkUserExists.name,
        email: checkUserExists.email,
      });

      return {
        user:checkUserExists,
        accessToken: accessToken,
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(data: createUserDto): Promise<User> {
    const { name, age, email, username, password, gender } = data;
    const userFound = await this.userRepository.findOneBy({ email });
    if (userFound) throw new NotFoundException('Email Already Exists!');
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const createUser = this.userRepository.create({
      name,
      age,
      email,
      username,
      password: hashPassword,
      gender,
    });
    return this.userRepository.save(createUser);
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
}
