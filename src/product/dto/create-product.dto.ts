import { IsDefined } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  name: string;
}
