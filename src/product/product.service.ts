import { Injectable } from '@nestjs/common';
import { ProductRepository } from './model/product.model';
import { AddProductsDto } from './dto/add-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProducts(addProductsDto: AddProductsDto) {
    return this.productRepository.createMany(addProductsDto.products);
  }

  async findAll(query: FindProductsDto) {
    const filter: any = {};
    if (query.name) {
      filter.name = query.name;
    }
    if (query.category) {
      filter.category = query.category;
    }
    if (query.isFeatured) {
      filter.isFeatured = true;
    }
    if (query.isNew) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filter.createdAt = { $gte: thirtyDaysAgo };
    }
    if (query.currentPage && query.resultsPerPage) {
      return this.productRepository.findWithPagination(
        filter,
        query.currentPage,
        query.resultsPerPage,
      );
    }
    return this.productRepository.find(query);
  }

  async searchProducts(searchString: string) {
    return this.productRepository.searchProducts(searchString);
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
