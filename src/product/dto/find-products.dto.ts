import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindProductsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumberString()
  @IsOptional()
  currentPage: number;

  @IsNumberString()
  @IsOptional()
  resultsPerPage: number;

  @IsBooleanString()
  @IsOptional()
  isFeatured: boolean;

  @IsBooleanString()
  @IsOptional()
  isNew: boolean;
}
