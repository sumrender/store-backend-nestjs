import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ConfigService.PORT);
  console.log(`:::::  App started on port: ${ConfigService.PORT}  :::::`);
}
bootstrap();
