import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/model/user.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersDto } from './dto/find-orders.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/app')
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const user: User = req.user;
    return this.orderService.create(user, createOrderDto);
  }

  @Post('/app/verify')
  async verifyPayment(@Req() req, @Body() verifyPaymentDto: VerifyPaymentDto) {
    const user: User = req.user;
    const res = await this.orderService.verifyPayment(user, verifyPaymentDto);
    return res;
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Req() req, @Query() findOrdersDto: FindOrdersDto) {
    const user: User = req.user;
    return this.orderService.findAll(user, findOrdersDto);
  }

  @Get('/app')
  findAllUserOrders(@Req() req) {
    const user: User = req.user;
    return this.orderService.findAllUserOrders(user._id);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async changeOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, updateOrderDto);
  }
}
