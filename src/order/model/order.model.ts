import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';
import { OrderStatusEnum, PaymentModeEnum } from 'src/shared/enums/order.enum';
import { User } from 'src/user/model/user.model';

export interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
}

@Schema({ versionKey: false })
export class Order extends BaseDocument {
  // transaction id also most probably

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  // @Prop({ required: true })
  // totalPrice: number;

  @Prop({
    type: String,
    enum: Object.values(PaymentModeEnum),
  })
  paymentMode: PaymentModeEnum;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop({
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.PENDING,
    _id: false,
  })
  orderStatus?: OrderStatusEnum;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: Product.name },
        quantity: Number,
      },
    ],
    required: true,
  })
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(@InjectModel(Order.name) orderModel: Model<Order>) {
    super(orderModel);
  }

  async fetchOrder(orderId: string) {
    return this.model
      .findById(BaseRepository.toObjectId(orderId))
      .populate('user')
      .populate('orderItems.product');
  }
}
