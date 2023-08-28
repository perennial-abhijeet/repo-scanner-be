import { ConfigData } from './config.interface';

/**
 * @description This is default configuration data for app
 */
export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  port: 3000,
  logLevel: 'http',
};
