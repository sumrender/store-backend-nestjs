import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/model/user.model';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { IsAdmin } from 'src/shared/auth/guards/admin.guard';
import { FindOrdersDto } from './dto/find-orders.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const user: User = req.user;
    return this.orderService.create(user, createOrderDto);
  }

  @Get()
  findAll(@Query() findOrdersDto: FindOrdersDto) {
    return this.orderService.findAll(findOrdersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(IsAdmin)
  @Patch(':id')
  async changeOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
