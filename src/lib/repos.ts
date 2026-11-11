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

/** A one-line Publication Status summary for cards and indexes. */
export function publicationSummary(repos: Repo[]): string {
  if (repos.some((repo) => repo.status === 'published' && repo.url)) return 'Repository published';
  if (repos.some((repo) => repo.status === 'private')) return 'Code private';
  if (repos.length === 0) return 'No repository';
  return 'Publishing soon';
}
