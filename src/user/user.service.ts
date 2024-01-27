import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './model/user.model';
import {
  InvalidMobileNumberError,
  InvalidOtpError,
  MobileNumberAlreadyExists,
  OtpExpiredError,
  UserDoesNotExistError,
} from './exceptions/user.exception';
import { ConfigEnum, ConfigService } from 'src/shared/configuration';
import { VerifyUserDto } from './dto/verify-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { mobileNumber } = createUserDto;
    if (!this.isValidMobileNumber(mobileNumber)) {
      throw new InvalidMobileNumberError();
    }
    const userAlreadyExists =
      await this.userRepository.findUserByMobileNumber(mobileNumber);

    if (userAlreadyExists) {
      throw new MobileNumberAlreadyExists();
    }

    const otp = this.generateOTP(6);
    const otpRes = await this.sendOtpToMobileNumber(mobileNumber, otp);
    const currentTime = Date.now();
    const expiredAt = new Date(currentTime + 15 * 60 * 1000); // 15 minutes

    await this.userRepository.create({
      mobileNumber,
      otp: {
        otp,
        expiredAt,
      },
    });

    return {
      success: otpRes,
    };
  }

  async login({ mobileNumber }: CreateUserDto) {
    if (!this.isValidMobileNumber(mobileNumber)) {
      throw new InvalidMobileNumberError();
    }

    const userAlreadyExists =
      await this.userRepository.findUserByMobileNumber(mobileNumber);

    if (!userAlreadyExists) {
      throw new UserDoesNotExistError();
    }

    const otp = this.generateOTP(6);
    const otpRes = await this.sendOtpToMobileNumber(mobileNumber, otp);
    const currentTime = Date.now();
    const expiredAt = new Date(currentTime + 15 * 60 * 1000); // 15 minutes

    await this.userRepository.findByIdAndUpdate(
      userAlreadyExists._id.toString(),
      {
        otp: {
          otp,
          expiredAt,
        },
      },
    );

    return {
      success: otpRes,
    };
  }

  async verifyUser(props: VerifyUserDto) {
    const user = await this.userRepository.findUserByMobileNumber(
      props.mobileNumber,
    );

    if (!user) {
      throw new InvalidMobileNumberError();
    }

    const current = new Date();
    const expiredAt = user.otp.expiredAt;

    if (current > expiredAt) {
      throw new OtpExpiredError();
    }

    if (props.otp != user.otp.otp) {
      throw new InvalidOtpError();
    }

    const updatedUser = await this.userRepository.findByIdAndUpdate(
      user._id.toString(),
      {
        verified: true,
        $unset: { otp: '' },
      },
    );

    const accessToken = await this.jwtService.sign({
      mobileNumber: user.mobileNumber,
      _id: user._id.toString(),
    });

    return {
      user: updatedUser,
      accessToken,
    };
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  async update(id: string, updateProductDto: UpdateUserDto) {
    return this.userRepository.findByIdAndUpdate(id, updateProductDto);
  }

  async deleteById(id: string) {
    return this.userRepository.findByIdAndDelete(id);
  }

  private isValidMobileNumber(mobileNumber: string): boolean {
    const regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);

    if (!mobileNumber) {
      return false;
    }
    if (regex.test(mobileNumber)) {
      return true;
    }
    return false;
  }

  private async sendOtpToMobileNumber(mobileNumber: string, otp: string) {
    try {
      const baseUrl = 'https://www.fast2sms.com/dev/bulkV2';

      const params = new URLSearchParams();
      params.append(
        'authorization',
        this.configService.get(ConfigEnum.FAST2SMS_AUTH),
      );
      params.append('route', 'otp');
      params.append('variables_values', otp);
      params.append('flash', '0'); // flash messages
      params.append('numbers', mobileNumber);

      // Combine base URL and query parameters
      const URL = `${baseUrl}?${params.toString()}`;

      const res = await axios.get(URL);
      return !!res.data;
    } catch (error) {
      console.log('-------------- send otp error -------------');
      return false;
    }
  }

  private generateOTP(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
}
