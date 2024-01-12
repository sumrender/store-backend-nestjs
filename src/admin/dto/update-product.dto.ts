import { PartialType } from '@nestjs/mapped-types';
import { AddProductsDto } from './add-products.dto';

export class UpdateProductDto extends PartialType(AddProductsDto) {}
