import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('billboards')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createBillboardDto: CreateBillboardDto) {
    return this.billboardService.create(createBillboardDto);
  }

  @Get()
  findAll() {
    return this.billboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billboardService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    return this.billboardService.update(id, updateBillboardDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billboardService.remove(id);
  }
}
