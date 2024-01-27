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
import { User } from './model/user.model';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('verify')
  async verifyUser(@Body() props: VerifyUserDto) {
    return this.userService.verifyUser(props);
  }

  @Post('login')
  async login(@Body() props: CreateUserDto) {
    return this.userService.login(props);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(@Req() req, @Body() updateProductDto: UpdateUserDto) {
    const user: User = req.user;
    return this.userService.update(user._id.toString(), updateProductDto);
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Req() req) {
    const user: User = req.user;
    return this.userService.deleteById(user._id.toString());
  }
}
