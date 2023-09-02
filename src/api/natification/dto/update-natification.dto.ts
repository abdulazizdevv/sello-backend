import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateNatificationDto } from './create-natification.dto';

export class UpdateNatificationDto extends PartialType(CreateNatificationDto) {
    @IsString()
    @IsOptional()
    message: string;
}
