import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './model/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { User } from 'src/user/model/user.model';
import { Types } from 'mongoose';
import Razorpay = require('razorpay');
import { ConfigEnum, ConfigService } from 'src/shared/configuration';
import { PaymentModeEnum } from 'src/shared/enums/order.enum';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { createHmac } from 'crypto';
import { OrderNotFoundError } from './exceptions/order-not-found.exception';
import { UserRoleEnum } from 'src/shared/enums';
import { UnauthorizedError } from 'src/shared/exceptions';
import { ProductRepository } from 'src/product/model/product.model';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
  ) {}
  async create(user: User, createOrderDto: CreateOrderDto) {
    const { street, city, state, zipCode } = user;
    const address = `${street}, ${city}, ${state}, ${zipCode}`;

    let razorpayOrder;
    if (createOrderDto.paymentMode === PaymentModeEnum.ONLINE) {
      razorpayOrder = await this.razorpayOrder(createOrderDto.finalPrice);
    }

    const newOrder = this.orderRepository.create({
      user: {
        mobileNumber: user.mobileNumber,
        user: user._id,
        address,
      },
      paymentMode: createOrderDto.paymentMode,
      isPaid: false,
      orderItems: createOrderDto.orderItems,
      finalPrice: createOrderDto.finalPrice,
      ...(razorpayOrder ? { razorpayOrderId: razorpayOrder.id } : {}),
    });

    // reduce inventory quantity for all ordered items
    const promises = createOrderDto.orderItems.map((item) =>
      this.productRepository.reduceQuantity(
        item.product.toString(),
        item.quantity,
      ),
    );

    await Promise.all(promises);

    return newOrder;
  }

  async verifyPayment(user: User, props: VerifyPaymentDto) {
    const orders = await this.orderRepository.find({
      razorpayOrderId: props.razorpay_order_id,
    });
    if (orders.length == 1) {
      const order = orders[0];
      const generatedSignature = this.generateSignature(
        order.razorpayOrderId,
        props.razorpay_payment_id,
        this.configService.get(ConfigEnum.RAZORPAY_SECRET),
      );
      if (generatedSignature === props.razorpay_signature) {
        return await this.orderRepository.findByIdAndUpdate(
          order._id.toString(),
          {
            isOnlinePaymentVerified: true,
            isPaid: true,
          },
        );
      }
      return await this.orderRepository.findByIdAndUpdate(
        order._id.toString(),
        {
          isOnlinePaymentVerified: false,
          isPaid: true,
        },
      );
    }

    throw new OrderNotFoundError();
  }

  findAll(user: User, findOrdersDto: FindOrdersDto) {
    if (user.role !== UserRoleEnum.ADMIN) {
      throw new UnauthorizedError();
    }
    return this.orderRepository.find(findOrdersDto);
  }

  findAllUserOrders(userId: Types.ObjectId) {
    return this.orderRepository.find({ 'user.user': userId });
  }

  findOne(id: string) {
    return this.orderRepository.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.findByIdAndUpdate(id, updateOrderDto);
  }

  private razorpayOrder(amountInRupees: number) {
    try {
      const instance = new Razorpay({
        key_id: this.configService.get(ConfigEnum.RAZORPAY_KEY),
        key_secret: this.configService.get(ConfigEnum.RAZORPAY_SECRET),
      });

      return instance.orders.create({
        amount: amountInRupees * 100,
        currency: 'INR',
      });
    } catch (error) {
      console.log('razorpay error::::::::::::::::::::::::::::', error);
    }
  }

  private generateSignature(
    orderId: string,
    razorpayPaymentId: string,
    secret: string,
  ): string {
    return createHmac('sha256', secret)
      .update(`${orderId}|${razorpayPaymentId}`)
      .digest('hex');
  }
}
