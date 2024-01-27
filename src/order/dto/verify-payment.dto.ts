import { IsDefined, IsOptional, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  @IsDefined()
  razorpay_payment_id: string;

  @IsString()
  @IsOptional()
  razorpay_order_id?: string;

  @IsOptional()
  @IsString()
  razorpay_signature?: string;
}
