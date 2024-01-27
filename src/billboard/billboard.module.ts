import { Module } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';
import {
  Billboard,
  BillboardRepository,
  BillboardSchema,
} from './models/billboard.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Billboard.name, schema: BillboardSchema },
    ]),
    UserModule,
  ],
  controllers: [BillboardController],
  providers: [BillboardService, BillboardRepository],
})
export class BillboardModule {}
