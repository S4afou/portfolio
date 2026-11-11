import type { Repo } from './project-schema';

/** A Repository is only linked when its Publication Status is published and it has a URL. */
export function linkableRepos(repos: Repo[]): Repo[] {
  return repos.filter((repo) => repo.status === 'published' && Boolean(repo.url));
}

/** Repositories whose code is not public yet. They render as a badge, never as a dead link. */
export function unpublishedRepos(repos: Repo[]): Repo[] {
  return repos.filter((repo) => repo.status !== 'published');
}

export function repoStatusLabel(repo: Repo): string {
  if (repo.status === 'private') return 'Private repository';
  if (repo.status === 'pending') return 'Publishing soon';
  return 'Repository';
}
