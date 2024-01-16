import { IsBooleanString, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatusEnum } from 'src/shared/enums/order.enum';

export class FindOrdersDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsBooleanString()
  @IsOptional()
  isPaid?: string;

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  orderStatus?: OrderStatusEnum;
}
