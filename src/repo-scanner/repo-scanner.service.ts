import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import HttpService_ from '../services/http.service';
import { githubUrls } from './constants';

@Injectable()
export class RepoScannerService {
  private username = '';
  private executionCounter: number = 0;
  private parallelProcess: number = 0;
  constructor(
    private readonly httpService: HttpService_,
    private readonly configService: ConfigService,
  ) {
    this.username = configService.get().username;
    this.parallelProcess = configService.get().parallelProcess;
  }

  public async getUserRepos() {
    const github_url = githubUrls.getRepoList.replace(
      'username',
      this.username,
    );
    const method = 'get';
    const response = await this.httpService.request(github_url, method);
    return response.items;
  }

  // This function first check working process
  // if it is less than config value it will execute
  // else wait till previous execution get's complete
  async checkAndFetchRepoDetails(repoName: string) {
    if (this.executionCounter < this.parallelProcess) {
      return this.getUserRepoDetails(repoName);
    }
    return await new Promise((res) =>
      setImmediate(() => res(this.checkAndFetchRepoDetails(repoName))),
    );
  }

  public async getUserRepoDetails(repoName: string) {
    this.executionCounter++;
    const method = 'get';
    // Get Repo details
    const repoDetails = this.getSingleRepo(repoName);

    // Get total file counts from Repo
    const repoFileCount = this.getFileCount(repoName);

    // Get Active webhook for repo
    const activeWebhook = this.activeWebhook(repoName);

    // resolve promises
    const [repoDetailsRes, repoFileCountRes, activeWebhookRes]: any =
      await Promise.allSettled([repoDetails, repoFileCount, activeWebhook]);
    // Throw error if status is rejected for any one of the promise
    if (repoDetailsRes.status == 'rejected') {
      throw new BadRequestException('Invalid repo name');
    }

    const total_files = repoFileCountRes?.value?.tree?.length || 0;
    // Fetch nested yml file data
    let yml_content = await this.getYmlFileContent(
      repoFileCountRes?.value?.tree || [],
      repoName,
      method,
    );

    // Check active webhook
    let active_webhook = false;
    if (activeWebhookRes?.value?.length) {
      active_webhook = activeWebhookRes.value.some((hook) => {
        return hook.active;
      });
    }
    this.executionCounter--;
    // Final Response
    const finalResponse = {
      ...repoDetailsRes.value,
      ...repoFileCountRes.value,
      ...activeWebhookRes.value,
      active_webhook,
      yml_content,
      total_files,
    };
    return finalResponse;
  }

  // Get Yml file content from repo
  async getYmlFileContent(files, repoName, method) {
    let yml_content: string = '';
    if (files.length) {
      let ymlFilePath = '';
      for (let file of files) {
        if (file.path.split('.').pop() == 'yml') {
          ymlFilePath = file.path;
          break;
        }
      }
      if (ymlFilePath) {
        // Get YML file content
        const getFileContentApi = githubUrls.fileContent
          .replace('username', this.username)
          .replace('reponame', repoName)
          .replace('path', ymlFilePath);
        const fileContent = this.httpService.request(getFileContentApi, method);
        const [fileContentRes]: any = await Promise.allSettled([fileContent]);
        if (fileContentRes.status == 'fulfilled') {
          yml_content = Buffer.from(
            fileContentRes.value.content,
            'base64',
          ).toString('utf8');
        }
      }
    }
    return yml_content;
  }

  async getSingleRepo(repoName: string) {
    const method = 'get';
    const getRepoDetailsApi = githubUrls.getSingleRepo
      .replace('username', this.username)
      .replace('reponame', repoName);
    return this.httpService.request(getRepoDetailsApi, method);
  }

  async getFileCount(repoName: string) {
    const method = 'get';
    const getRepoFileCountApi = githubUrls.getFileCount
      .replace('username', this.username)
      .replace('reponame', repoName);
    return this.httpService.request(getRepoFileCountApi, method);
  }

  async activeWebhook(repoName: string) {
    const method = 'get';
    const getActiveWebhookApi = githubUrls.activeWebhook
      .replace('username', this.username)
      .replace('reponame', repoName);
    return this.httpService.request(getActiveWebhookApi, method);
  }
}
