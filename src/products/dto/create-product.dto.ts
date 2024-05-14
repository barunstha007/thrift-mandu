import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  images: Array<string>;

  @IsString()
  size: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  brand: string;

  @IsString()
  category: string;
}
