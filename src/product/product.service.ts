import { Injectable } from '@nestjs/common';
import { ProductRepository } from './model/product.model';
import { AddProductsDto } from './dto/add-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProducts(addProductsDto: AddProductsDto) {
    return this.productRepository.createMany(addProductsDto.products);
  }

  async findAll() {
    return this.productRepository.find({});
  }

  async findById(id: string) {
    return this.productRepository.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return this.productRepository.findByIdAndDelete(id);
  }
}
