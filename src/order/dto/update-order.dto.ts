import { IsEnum } from 'class-validator';
import { OrderStatusEnum } from 'src/shared/enums/order.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatusEnum)
  orderStatus?: OrderStatusEnum;
}
