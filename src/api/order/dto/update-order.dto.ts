import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsString()
    @IsOptional()
    name: string;
  
    @IsString()
    @IsOptional()
    lname: string;
  
    @IsString()
    @IsOptional()
    phone_number: string;
  
    @IsString()
    @IsOptional()
    province: string;
  
    @IsString()
    @IsOptional()
    district: string;
  
    @IsString()
    @IsOptional()
    street: string;
  
    @IsString()
    @IsOptional()
    apartment: string;
  
    @IsNumber()
    @IsOptional()
    order_price: number;

    @IsNumber()
    @IsOptional()
    product_count: number;
  
    @IsString()
    @IsOptional()
    message_to_courier: string;
  
    @IsBoolean()
    @IsOptional()
    is_private: boolean;
  
    @IsString()
    @IsOptional()
    status: string;
  
    @IsNumber()
    @IsOptional()
    product_id: number;
}
