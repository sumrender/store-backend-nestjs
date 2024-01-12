import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/shared/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';
import { User } from './model/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req, @Body() updateProductDto: UpdateUserDto) {
    const user: User = req.user;
    return this.userService.update(user._id.toString(), updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req) {
    const user: User = req.user;
    return this.userService.deleteById(user._id.toString());
  }
}
