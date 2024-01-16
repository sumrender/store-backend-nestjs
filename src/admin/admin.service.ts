import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/model/product.model';

@Injectable()
export class AdminService {
  constructor(private readonly productRepository: ProductRepository) {}
}
