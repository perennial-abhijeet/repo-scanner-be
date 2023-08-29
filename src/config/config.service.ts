import { Injectable } from '@nestjs/common';

// Local imports
import { DEFAULT_CONFIG } from './config.default';
import { ConfigData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public async lofusingDotEnv() {
    this.config = await this.parseConfigFromEnv(process.env);
  }

  private async parseConfigFromEnv(
    env: NodeJS.ProcessEnv,
  ): Promise<ConfigData> {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      username: env.USER_NAME || DEFAULT_CONFIG.username,
      github_token: env.GIT_TOKEN || '',
      parallelProcess: env.PORT
        ? parseInt(env.PORT, 10)
        : DEFAULT_CONFIG.parallelProcess,
    };
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
