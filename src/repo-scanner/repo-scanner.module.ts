import { Module } from '@nestjs/common';
import { RepoScannerService } from './repo-scanner.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { RepoScannerResolver } from './repo-scanner.resolver';

@Module({
  imports: [HttpModule, ConfigModule, LoggerModule],
  providers: [RepoScannerService, RepoScannerResolver],
})
export class RepoScannerModule {}
