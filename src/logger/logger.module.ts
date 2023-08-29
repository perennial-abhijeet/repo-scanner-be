import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// Local imports
import { ConfigModule } from '../config/config.module';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';

/**
 * @description This is logger module that configure logger in nest application
 */
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
