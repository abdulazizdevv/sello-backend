import {
  Controller,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PayDto } from './dto/pay.dto';
import { Request } from 'express';


@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Req() req: Request) {
    return this.walletService.create(createWalletDto, req);
  }

  // @UseGuards(AuthGuard)
  @Post("payment")
  payment(@Body() paymentDto: PayDto, @Req() req: Request) {
    return this.walletService.pay(paymentDto, req);
  }

  // @Get()
  // findAll() {
  //   return this.walletService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.walletService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
  //   return this.walletService.update(+id, updateWalletDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.walletService.remove(+id);
  // }
}
