import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';
import { UserRoleEnum } from 'src/shared/enums';

interface UserOtp {
  otp: string;
  expiredAt: Date;
}

@Schema({ versionKey: false })
export class User extends BaseDocument {
  @Prop({ required: true, unique: true })
  mobileNumber: string;

  @Prop({ required: false, default: false })
  verified?: string;

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

  @Prop({
    required: false,
    type: {
      otp: { type: String },
      expiredAt: { type: Date },
    },
    _id: false,
  })
  otp?: UserOtp;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  async findUserByMobileNumber(mobileNumber: string) {
    return this.model.findOne({ mobileNumber });
  }
}
