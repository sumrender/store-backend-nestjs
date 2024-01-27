import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddProductDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty({ each: true, message: 'At least one image is required' })
  images: string[];

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}

export class AddProductsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddProductDto)
  products: AddProductDto[];
}
