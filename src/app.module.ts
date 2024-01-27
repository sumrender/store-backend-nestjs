import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './shared/configuration';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BillboardModule } from './billboard/billboard.module';
import { CategoryModule } from './category/category.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  controllers: [AppController],
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          // options: {
          //   singleLine: true,
          // },
        },
      },
    }),
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
    MongooseModule.forRootAsync({
      // need to import shared module then I might as well handle above config setup in shared folder only...
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async () => ({
        uri: ConfigService.DB_URL,
      }),
    }),
    ProductModule,
    UserModule,
    OrderModule,
    BillboardModule,
    CategoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
