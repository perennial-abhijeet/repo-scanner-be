import { Resolver, Query, Args} from '@nestjs/graphql';
import { RepoScanner, RepoScannerDetails } from './models/repo-scanner';
import { RepoScannerService } from './repo-scanner.service';

@Resolver(() => RepoScanner)
export class RepoScannerResolver {
  constructor(private readonly repoScannerService: RepoScannerService) {}

  @Query(() => [RepoScanner], { name: 'userRepoList', nullable: true })
  getUserRepoList(): any {
    return this.repoScannerService.getUserRepos();
  }

  @Query(() => RepoScannerDetails, { name: 'repoScannerDetails', nullable: true })
  getScannerDetails(@Args('repoName') repoName: string): any {
    return this.repoScannerService.checkAndFetchRepoDetails(repoName);
  }
}
