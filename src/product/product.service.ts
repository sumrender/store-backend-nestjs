import { Injectable } from '@nestjs/common';
import { ProductRepository } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll() {
    return this.productRepository.find({});
  }

  findById(id: string) {
    return this.productRepository.findById(id);
  }
}
