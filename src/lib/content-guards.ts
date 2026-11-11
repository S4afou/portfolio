import fs from 'node:fs';
import path from 'node:path';

type GuardedProject = {
  id: string;
  data: {
    title: string;
    cover: { src: string };
    gallery: { src: string }[];
  };
};

/**
 * Build guardrails for content. Throws before a page is generated when a
 * Project slug is duplicated or an image referenced in frontmatter is missing.
 */
export function assertProjectAssets(projects: GuardedProject[]): void {
  const seen = new Set<string>();

  for (const project of projects) {
    if (seen.has(project.id)) {
      throw new Error(`Duplicate Project slug: "${project.id}". Each Project needs a unique filename.`);
    }
    seen.add(project.id);

    for (const image of [project.data.cover, ...project.data.gallery]) {
      const file = path.join(process.cwd(), 'public', image.src.replace(/^\//, ''));

      if (!fs.existsSync(file)) {
        throw new Error(
          `Project "${project.data.title}" references a missing image: ${image.src}. Add the file under public${image.src}.`
        );
      }
    }
  }
}
