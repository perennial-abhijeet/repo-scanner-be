import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LoggerModule } from './logger/logger.module';
import { RepoScannerModule } from './repo-scanner/repo-scanner.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      autoSchemaFile: true,
      playground: true,
    }),
    LoggerModule,
    RepoScannerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
