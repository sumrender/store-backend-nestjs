import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';
import { UserRoleEnum } from 'src/shared/enums';

@Schema({ versionKey: false })
export class User extends BaseDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: UserRoleEnum.USER, required: false })
  role?: UserRoleEnum;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: false })
  street?: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  state?: string;

  @Prop({ required: false })
  zipCode?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  async findUserByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
