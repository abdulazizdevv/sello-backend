import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  apartment: string;

  @IsNumber()
  @IsNotEmpty()
  order_price: number;

  @IsNumber()
  @IsNotEmpty()
  product_count: number;

  @IsString()
  @IsNotEmpty()
  message_to_courier: string;

  @IsBoolean()
  @IsOptional()
  is_private: boolean;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
