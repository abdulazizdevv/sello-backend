import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBasketDto: CreateBasketDto, @Req() req: Request) {
    return this.basketService.create(createBasketDto, req);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBasketDto: UpdateBasketDto,
    @Req() req: Request,
  ) {
    return this.basketService.update(+id, updateBasketDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
