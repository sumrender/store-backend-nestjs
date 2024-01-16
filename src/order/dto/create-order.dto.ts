import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsEnum,
  IsString,
} from 'class-validator';
import { PaymentModeEnum } from 'src/shared/enums/order.enum';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsMongoId()
  product: Types.ObjectId;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  name: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(PaymentModeEnum)
  paymentMode: PaymentModeEnum;

  @IsString()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
