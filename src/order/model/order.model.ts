import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';
import { OrderStatusEnum, PaymentModeEnum } from 'src/shared/enums/order.enum';
import { User } from 'src/user/model/user.model';

export interface OrderItem {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderUser {
  email: string;
  address: string;
  user: Types.ObjectId;
}

@Schema({ versionKey: false })
export class Order extends BaseDocument {
  // transaction id also most probably

  @Prop({
    type: {
      user: { type: Types.ObjectId, ref: User.name },
      email: { type: String },
      address: { type: String },
    },
    _id: false,
  })
  user: OrderUser;

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
        price: Number,
        quantity: Number,
        name: String,
        image: String,
      },
    ],
    required: true,
    _id: false,
  })
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(@InjectModel(Order.name) orderModel: Model<Order>) {
    super(orderModel);
  }
}
