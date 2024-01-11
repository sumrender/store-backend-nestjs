import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDocument, BaseRepository } from 'src/shared/base-model';

@Schema({ versionKey: false })
export class Product extends BaseDocument {
  @Prop()
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    super(productModel);
  }
}
