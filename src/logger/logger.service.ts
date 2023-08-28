import { Injectable, LoggerService as Logger_ } from '@nestjs/common';
import moment from 'moment';
import { MESSAGE } from 'triple-beam';
import winston from 'winston';
import  'winston-daily-rotate-file';
// Local imports
import { ConfigService } from '../config/config.service';
import { isLogLevel, LogLevel } from './loglevel';

/**
 * Formate log object
 */
const formatter = winston.format((info) => {
  info.message = JSON.stringify({
    time: moment().format('ddd MMM DD HH:mm:ss YYYY'),
    level: info.level,
    message: info.message
  })
  return info;
});

const passthrough = winston.format((info) => {
  info[MESSAGE] = info.message;
  return info;
});

/**
 * Provides a means to write log messages.
 */
@Injectable()
export class LoggerService implements Logger_ {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      level: configService.get().logLevel,
      format: formatter(),
    });
    this.logger.add(new winston.transports.Console({
      format: passthrough(),
      stderrLevels: [LogLevel.Error, LogLevel.Warn],
    }));
    this.logger.add(new winston.transports.DailyRotateFile({
      format: passthrough(),
      level: LogLevel.HTTP,
      filename: 'logs/combined/combined.log.%DATE%',
      datePattern: 'DD-MM-YYYY',
    }));
    this.logger.add(new winston.transports.DailyRotateFile({
      format: passthrough(),
      level: LogLevel.Error,
      filename: 'logs/error/error.log.%DATE%',
      datePattern: 'DD-MM-YYYY',
    }));
  }

  /**
   * Writes a log message.
   * @param level the severity of the message
   * @param message the log message
   */
  public log(p0: LogLevel | string, p1?: string) {
    const logLevel = isLogLevel(p0) ? p0 : LogLevel.Info;
    const message = (isLogLevel(p0) && p1) ? p1 : p0;
    this.logger.log(logLevel, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Error} log level.
   * @param message the log message
   */
  public error(message: string) {
    this.log(LogLevel.Error, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Warn} log level.
   * @param message the log message
   */
  public warn(message: string) {
    this.log(LogLevel.Warn, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Info} log level.
   * @param message the log message
   */
  public info(message: string) {
    this.log(LogLevel.Info, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.HTTP} log level.
   * @param message the log message
   */
  public http(message: string) {
    this.log(LogLevel.HTTP, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Verbose} log level.
   * @param message the log message
   */
  public verbose(message: string) {
    this.log(LogLevel.Verbose, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Debug} log level.
   * @param message the log message
   */
  public debug(message: string) {
    this.log(LogLevel.Debug, message);
  }

  /**
   * Writes a log message with the {@link LogLevel.Silly} log level.
   * @param message the log message
   */
  public silly(message: string) {
    this.log(LogLevel.Silly, message);
  }
}