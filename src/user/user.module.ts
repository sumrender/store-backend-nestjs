import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserRepository, UserSchema } from './model/user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [UserRepository],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
})
export class UserModule {}
