import { Global, Module } from '@nestjs/common';

// Local imports
import { ConfigService } from './config.service';

const configFactory = {
  provide: ConfigService,
  useFactory: async () => {
    const config = new ConfigService();
    await config.lofusingDotEnv();
    return config;
  },
};

/**
 * @description This is configuration module that loads configuration service
 */
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    configFactory
  ],
  exports: [configFactory],
})
export class ConfigModule {}