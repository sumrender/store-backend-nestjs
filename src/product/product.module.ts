import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductRepository,
  ProductSchema,
} from './model/product.model';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UserModule,
  ],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository],
})
export class ProductModule {}
