import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure global DTO validation pipe
  app.useGlobalPipes(new ValidationPipe(null));
  // Get config service 
  const configService = app.get(ConfigService);
  await app.listen(configService.get().port,() => { 
    console.log('Server started on port ' + configService.get().port)
   });
}
bootstrap();
