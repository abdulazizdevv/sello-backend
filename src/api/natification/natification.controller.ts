import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { NatificationService } from './natification.service';
import { CreateNatificationDto } from './dto/create-natification.dto';
import { UpdateNatificationDto } from './dto/update-natification.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('natification')
export class NatificationController {
  constructor(private readonly natificationService: NatificationService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createNatificationDto: CreateNatificationDto,
    @Req() req: Request,
  ) {
    return this.natificationService.create(createNatificationDto, req);
  }

  @Get()
  findAll() {
    return this.natificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natificationService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNatificationDto: UpdateNatificationDto,
    @Req() req: Request,
  ) {
    return this.natificationService.update(+id, updateNatificationDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natificationService.remove(+id);
  }
}
