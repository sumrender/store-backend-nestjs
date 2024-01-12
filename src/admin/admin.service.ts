import { Injectable } from '@nestjs/common';
import { AddProductsDto } from './dto/add-products.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ProductRepository } from 'src/product/model/product.model';

@Injectable()
export class AdminService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProducts(addProductsDto: AddProductsDto) {
    return this.productRepository.createMany(addProductsDto.products);
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return updateAdminDto;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
