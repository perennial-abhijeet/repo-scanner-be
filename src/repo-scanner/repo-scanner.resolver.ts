import { Resolver, Query } from '@nestjs/graphql';
import { RepoScanner } from './models/repo-scanner';
import { RepoScannerService } from './repo-scanner.service';

@Resolver(() => RepoScanner)
export class RepoScannerResolver {
  constructor(private readonly scannerService: RepoScannerService) {}

  @Query(() => [RepoScanner], { name: 'userRepoList', nullable: true })
  getUserRepoList(): any {
    return null;
  }
}
