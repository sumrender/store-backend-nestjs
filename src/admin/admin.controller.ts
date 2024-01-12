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
import { AdminService } from './admin.service';
import { AddProductsDto } from './dto/add-products.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { IsAdmin } from 'src/shared/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, IsAdmin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async addProducts(@Body() addProductsDto: AddProductsDto) {
    return this.adminService.addProducts(addProductsDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
