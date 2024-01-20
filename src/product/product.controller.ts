import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductsDto } from './dto/add-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProducts(@Body() addProductsDto: AddProductsDto) {
    return this.productService.addProducts(addProductsDto);
  }

  @Get()
  async findAll(@Query() query: FindProductsDto) {
    return this.productService.findAll(query);
  }

  @Get('/search')
  async searchProducts(@Query('find') searchString: string) {
    return this.productService.searchProducts(searchString);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
