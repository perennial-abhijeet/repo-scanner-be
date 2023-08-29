import { Module } from '@nestjs/common';
import { RepoScannerService } from './repo-scanner.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { RepoScannerResolver } from './repo-scanner.resolver';
import HttpService_ from '../utils/http.service';

@Module({
  imports: [HttpModule, ConfigModule, LoggerModule],
  providers: [RepoScannerService, RepoScannerResolver, HttpService_],
})
export class RepoScannerModule {}
