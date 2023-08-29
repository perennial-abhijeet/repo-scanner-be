import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export default class HttpService_ {
  private token: string = '';
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.token = configService.get().github_token;
  }

  async request(url: string, method: string, data: any = {}) {
    try {
      const headers: any = {
        Accept: 'application/vnd.github+json',
      };
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }
      const options = {
        url,
        method,
        data,
        headers,
      };
      this.loggerService.info(
        `Making call to GitHub server with options ${JSON.stringify(options)}`,
      );
      const requestAt = Date.now();
      return await lastValueFrom(
        this.httpService.request(options).pipe(
          map((axiosResponse: any) => {
            const responseInMS = Date.now() - requestAt;
            this.loggerService.info(
              `Response received from GitHub server for API ${url} in ${responseInMS} MS`,
            );
            return axiosResponse.data;
          }),
          catchError((error) => {
            const responseInMS = Date.now() - requestAt;
            const errorResponse = error.response?.data || {};
            let errorMessage = 'Something went wrong';
            if (errorResponse?.errors?.length) {
              errorMessage = errorResponse.errors[0];
            } else if (errorResponse.message) {
              if (this.isStringifyObject(errorResponse.message)) {
                const parsedError = JSON.parse(errorResponse.message);
                errorMessage = parsedError.errorMessage || errorResponse.code;
              } else {
                errorMessage = errorResponse.message;
              }
            }
            this.loggerService.error(
              `Error received from GitHub server for API ${url} in ${responseInMS} MS ${JSON.stringify(
                error?.response?.data || {},
              )}`,
            );
            throw new HttpException(
              { message: errorMessage },
              error?.response?.status || 400,
            );
          }),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  private isStringifyObject(val: string) {
    try {
      JSON.parse(val);
      return true;
    } catch (error) {
      return false;
    }
  }
}
