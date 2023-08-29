export const githubUrls = {
  getRepoList: 'https://api.github.com/search/repositories?q=user:username',
  getSingleRepo: 'https://api.github.com/repos/username/reponame',
  getFileCount: 'https://api.github.com/repos/username/reponame/git/trees/master?recursive=1',
  activeWebhook: 'https://api.github.com/repos/username/reponame/hooks',
  fileContent: 'https://api.github.com/repos/username/reponame/contents/path',
}