import type { Repo } from './project-schema';

export type PublishedRepo = Repo & { url: string };

function isPublished(repo: Repo): repo is PublishedRepo {
  return repo.status === 'published' && Boolean(repo.url);
}

/** A Repository is only linked when its Publication Status is published and it has a URL. */
export function linkableRepos(repos: Repo[]): PublishedRepo[] {
  return repos.filter(isPublished);
}
