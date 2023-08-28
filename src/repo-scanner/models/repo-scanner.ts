import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Owner {
  @Field()
  login: string;

  @Field()
  id: number;

  @Field()
  node_id: string;

  @Field()
  avatar_url: string;

  @Field()
  gravatar_id: string;

  @Field()
  url: string;

  @Field()
  html_url: string;

  @Field()
  followers_url: string;

  @Field()
  following_url: string;

  @Field()
  gists_url: string;

  @Field()
  starred_url: string;

  @Field()
  subscriptions_url: string;

  @Field()
  organizations_url: string;

  @Field()
  repos_url: string;

  @Field()
  events_url: string;

  @Field()
  received_events_url: string;

  @Field()
  type: string;

  @Field()
  site_admin: boolean;
}

@ObjectType()
export class RepoScanner {
  @Field()
  id: number;

  @Field()
  node_id: string;

  @Field()
  name: string;

  @Field()
  full_name: string;

  @Field()
  private: boolean;

  @Field((type) => Owner)
  owner: Owner;

  @Field()
  html_url: string;

  @Field()
  description: string;

  @Field()
  fork: boolean;

  @Field()
  url: string;

  @Field()
  forks_url: string;

  @Field()
  keys_url: string;

  @Field()
  collaborators_url: string;

  @Field()
  teams_url: string;

  @Field()
  hooks_url: string;

  @Field()
  issue_events_url: string;

  @Field()
  events_url: string;

  @Field()
  assignees_url: string;

  @Field()
  branches_url: string;

  @Field()
  tags_url: string;

  @Field()
  blobs_url: string;

  @Field()
  git_tags_url: string;

  @Field()
  git_refs_url: string;

  @Field()
  trees_url: string;

  @Field()
  statuses_url: string;

  @Field()
  languages_url: string;

  @Field()
  stargazers_url: string;

  @Field()
  contributors_url: string;

  @Field()
  subscribers_url: string;

  @Field()
  subscription_url: string;

  @Field()
  commits_url: string;

  @Field()
  git_commits_url: string;

  @Field()
  comments_url: string;

  @Field()
  issue_comment_url: string;

  @Field()
  contents_url: string;

  @Field()
  compare_url: string;

  @Field()
  merges_url: string;

  @Field()
  archive_url: string;

  @Field()
  downloads_url: string;

  @Field()
  issues_url: string;

  @Field()
  pulls_url: string;

  @Field()
  milestones_url: string;

  @Field()
  notifications_url: string;

  @Field()
  labels_url: string;

  @Field()
  releases_url: string;

  @Field()
  deployments_url: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  pushed_at: string;

  @Field()
  git_url: string;

  @Field()
  ssh_url: string;

  @Field()
  clone_url: string;

  @Field()
  svn_url: string;

  @Field()
  homepage: string;

  @Field()
  size: number;

  @Field()
  stargazers_count: number;

  @Field()
  watchers_count: number;

  @Field()
  language: string;

  @Field()
  has_issues: boolean;

  @Field()
  has_projects: boolean;

  @Field()
  has_downloads: boolean;

  @Field()
  has_wiki: boolean;

  @Field()
  has_pages: boolean;

  @Field()
  has_discussions: boolean;

  @Field()
  forks_count: number;

  @Field()
  mirror_url: string;

  @Field()
  archived: boolean;

  @Field()
  disabled: boolean;

  @Field()
  open_issues_count: number;

  @Field()
  license: string;

  @Field()
  allow_forking: boolean;

  @Field()
  is_template: boolean;

  @Field()
  web_commit_signoff_required: boolean;

  @Field((type) => [String], { nullable: true })
  topics: string[];

  @Field()
  visibility: string;

  @Field()
  forks: number;

  @Field()
  open_issues: number;

  @Field()
  watchers: number;

  @Field()
  default_branch: string;
}

@ObjectType()
export class RepoScannerDetails {
  @Field()
  id: number;

  @Field()
  node_id: string;

  @Field()
  name: string;

  @Field()
  full_name: string;

  @Field()
  private: boolean;

  @Field((type) => Owner)
  owner: Owner;

  @Field()
  html_url: string;

  @Field()
  description: string;

  @Field()
  fork: boolean;

  @Field()
  url: string;

  @Field()
  forks_url: string;

  @Field()
  keys_url: string;

  @Field()
  collaborators_url: string;

  @Field()
  teams_url: string;

  @Field()
  hooks_url: string;

  @Field()
  issue_events_url: string;

  @Field()
  events_url: string;

  @Field()
  assignees_url: string;

  @Field()
  branches_url: string;

  @Field()
  tags_url: string;

  @Field()
  blobs_url: string;

  @Field()
  git_tags_url: string;

  @Field()
  git_refs_url: string;

  @Field()
  trees_url: string;

  @Field()
  statuses_url: string;

  @Field()
  languages_url: string;

  @Field()
  stargazers_url: string;

  @Field()
  contributors_url: string;

  @Field()
  subscribers_url: string;

  @Field()
  subscription_url: string;

  @Field()
  commits_url: string;

  @Field()
  git_commits_url: string;

  @Field()
  comments_url: string;

  @Field()
  issue_comment_url: string;

  @Field()
  contents_url: string;

  @Field()
  compare_url: string;

  @Field()
  merges_url: string;

  @Field()
  archive_url: string;

  @Field()
  downloads_url: string;

  @Field()
  issues_url: string;

  @Field()
  pulls_url: string;

  @Field()
  milestones_url: string;

  @Field()
  notifications_url: string;

  @Field()
  labels_url: string;

  @Field()
  releases_url: string;

  @Field()
  deployments_url: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  pushed_at: string;

  @Field()
  git_url: string;

  @Field()
  ssh_url: string;

  @Field()
  clone_url: string;

  @Field()
  svn_url: string;

  @Field()
  homepage: string;

  @Field()
  size: number;

  @Field()
  stargazers_count: number;

  @Field()
  watchers_count: number;

  @Field()
  language: string;

  @Field()
  has_issues: boolean;

  @Field()
  has_projects: boolean;

  @Field()
  has_downloads: boolean;

  @Field()
  has_wiki: boolean;

  @Field()
  has_pages: boolean;

  @Field()
  has_discussions: boolean;

  @Field()
  forks_count: number;

  @Field()
  mirror_url: string;

  @Field()
  archived: boolean;

  @Field()
  disabled: boolean;

  @Field()
  open_issues_count: number;

  @Field()
  license: string;

  @Field()
  allow_forking: boolean;

  @Field()
  is_template: boolean;

  @Field()
  web_commit_signoff_required: boolean;

  @Field((type) => [String], { nullable: true })
  topics: string[];

  @Field()
  visibility: string;

  @Field()
  forks: number;

  @Field()
  open_issues: number;

  @Field()
  watchers: number;

  @Field()
  default_branch: string;

  @Field()
  total_files: number;

  @Field()
  active_webhook: boolean;

  @Field()
  yml_content: string;
}
