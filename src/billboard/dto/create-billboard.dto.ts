import { IsOptional, IsUrl } from 'class-validator';

export class CreateBillboardDto {
  @IsUrl()
  url: string;

  @IsOptional()
  label: string;
}
