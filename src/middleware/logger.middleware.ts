import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import moment from 'moment';

// Local imports
import { LoggerService } from '../logger/logger.service';

/**
 * @description This logger middleware that execute in http request and response cycle
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  public constructor(private logger: LoggerService) { }

  public use(req: Request, res: Response, next: () => void): any {
    this.logger.http(this.generateLogMessageForRequest(req, res))
    const before = Date.now();
    next();
    res.on('close', () => this.logger.http(this.generateLogMessage(req, res, Date.now() - before)));
  }

  private getResponseSize(res: Response): number {
    const sizeRaw = res.getHeader('Content-Length');
    if (typeof sizeRaw === 'number') { return sizeRaw; }
    if (typeof sizeRaw === 'string') {
      const parsed = parseInt(sizeRaw, 10);
      if (isNaN(parsed)) { return 0; }
      return parsed;
    }
    return 0;
  }

  private generateLogMessage(req: Request, res: Response, timeTaken: number): string {
    const size = this.getResponseSize(res);
    const terms: { [key: string]: string } = {
      '%h': req.socket.remoteAddress || '-',
      '%l': '-',
      '%u': req?.headers?.authorization || '', // todo: parse req.headers.authorization?
      '%t': `[${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')}]`,
      '%r': `${req.method} ${req.originalUrl} ${req.httpVersion}`,
      '%>s': `${res.statusCode}`,
      '%b': size === 0 ? '-' : `${size}`,
      'type': 'response',
      'timeTaken': timeTaken.toString()
    };
    let str = 'type %h %l %u %t \"%r\" %>s %b %{Referer}i %{User-agent}i  totalTime:- timeTaken ms';
    for (const term in terms) {
      if (term in terms) {
        str = str.replace(term, terms[term]);
      }
    }
    str = str.replace(/%\{([a-zA-Z\-]+)\}i/g, (match, p1) => {
      const header = req.headers[`${p1}`.toLowerCase()];
      if (header == null) { return '-'; }
      if (Array.isArray(header)) { return `"${header.join(',')}"`; }
      return `"${header}"`;
    });
    return str;
  }

  private generateLogMessageForRequest(req, res) {
    const terms: { [key: string]: string } = {
      'remote-add': req.socket.remoteAddress || '-',
      'header-auth': req?.headers?.authorization || '', // todo: parse req.headers.authorization?
      'time': `[${moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')}]`,
      'api': `${req.method} ${req.originalUrl} ${req.httpVersion}`,
      'params': JSON.stringify(req.params || {}),
      'query': JSON.stringify(req.query || {}),
      'body': JSON.stringify(req.body || {}),
      'type': 'request'
    };
    return JSON.stringify(terms);
  }
}