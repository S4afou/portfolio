import { getCollection, type CollectionEntry } from 'astro:content';

/** Every published Project, in the manual `order` sequence used by cards and navigation. */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  return projects.sort((a, b) => a.data.order - b.data.order);
}
