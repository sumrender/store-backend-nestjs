import { PartialType } from '@nestjs/mapped-types';
import { AddProductDto } from './add-products.dto';

export class UpdateProductDto extends PartialType(AddProductDto) {}
