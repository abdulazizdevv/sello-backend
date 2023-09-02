import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infra/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
