import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './model/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { User } from 'src/user/model/user.model';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  create(user: User, createOrderDto: CreateOrderDto) {
    // call the payment service, it does stuff,
    // then create the order

    return this.orderRepository.create({
      user: {
        email: user.email,
        user: user._id,
        address: createOrderDto.address,
      },
      paymentMode: createOrderDto.paymentMode,
      isPaid: false,
      orderItems: createOrderDto.orderItems,
    });
  }

  findAll(findOrdersDto: FindOrdersDto) {
    return this.orderRepository.find(findOrdersDto);
  }

  findOne(id: string) {
    return this.orderRepository.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
