import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './model/order.model';
import { Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  create(userId: Types.ObjectId, createOrderDto: CreateOrderDto) {
    // call the payment service, it does stuff,
    // then create the order
    return this.orderRepository.create({
      user: userId,
      ...createOrderDto,
      isPaid: false,
    });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return this.orderRepository.fetchOrder(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
