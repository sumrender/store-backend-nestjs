import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { PaymentModeEnum } from 'src/shared/enums/order.enum';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsMongoId()
  product: Types.ObjectId;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(PaymentModeEnum)
  paymentMode: PaymentModeEnum;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}