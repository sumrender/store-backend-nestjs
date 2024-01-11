import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  findAll() {
    return this.productRepository.find({});
  }

  findById(id: string) {
    return this.productRepository.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.findByIdAndUpdate(id, updateProductDto);
  }

  deleteById(id: string) {
    return this.productRepository.findByIdAndDelete(id);
  }
}
