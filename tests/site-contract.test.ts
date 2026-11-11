import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { projectSchema } from '../src/lib/project-schema';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content', 'projects');
const distDir = path.join(root, 'dist');

const projects = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { data } = matter(raw);

    return { slug: file.replace(/\.md$/, ''), data };
  });

const routes = ['', 'projects', 'about', '404', ...projects.map((project) => `projects/${project.slug}`)];

function htmlFor(route: string): string {
  if (route === '404') return fs.readFileSync(path.join(distDir, '404.html'), 'utf8');

  const file = route === '' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');

  return fs.readFileSync(file, 'utf8');
}

const pages = routes.map((route) => ({ route, html: htmlFor(route) }));

function anchors(html: string) {
  return [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map((match) => {
    const tag = match[0];
    const href = /href="([^"]*)"/.exec(tag)?.[1] ?? '';
    const text = tag
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return { href, text, tag };
  });
}

function images(html: string) {
  return [...html.matchAll(/<img\b[^>]*>/g)].map((match) => ({
    src: /src="([^"]*)"/.exec(match[0])?.[1] ?? '',
    alt: /alt="([^"]*)"/.exec(match[0])?.[1],
  }));
}

function textContent(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ');
}

describe('content-to-page contract', () => {
  it('produces exactly one page per Project slug and no extras', () => {
    const rendered = fs
      .readdirSync(path.join(distDir, 'projects'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => fs.existsSync(path.join(distDir, 'projects', entry.name, 'index.html')))
      .map((entry) => entry.name)
      .sort();

    expect(rendered).toEqual(projects.map((project) => project.slug).sort());
  });

  it('validates every Project against the schema with required fields non-empty', () => {
    for (const project of projects) {
      const parsed = projectSchema.safeParse(project.data);
      expect(parsed.success, `${project.slug} fails schema validation`).toBe(true);

      for (const field of ['title', 'summary', 'ownership', 'timeframe', 'problem', 'reflection']) {
        expect(String(project.data[field]).trim().length, `${project.slug}.${field}`).toBeGreaterThan(0);
      }
      expect(project.data.stack.length).toBeGreaterThan(1);
      expect(project.data.results.length).toBeGreaterThan(1);
    }
  });

  it('never renders an unpublished Repository as an anchor', () => {
    for (const project of projects) {
      const page = pages.find((entry) => entry.route === `projects/${project.slug}`);
      if (!page) throw new Error(`No page for ${project.slug}`);

      const unpublished = project.data.repos.filter(
        (repo: { status: string }) => repo.status !== 'published'
      );
      const published = project.data.repos.filter(
        (repo: { status: string; url?: string }) => repo.status === 'published' && repo.url
      );

      for (const repo of unpublished) {
        const leaked = anchors(page.html).some(
          (anchor) => anchor.text.includes(repo.label) || anchor.href === repo.url
        );
        expect(leaked, `${project.slug} links unpublished ${repo.label}`).toBe(false);
      }

      if (unpublished.length > 0) {
        expect(page.html).toContain('Publishing soon');
      }

      for (const repo of published) {
        const link = anchors(page.html).find((anchor) => anchor.href === repo.url);
        expect(link, `${project.slug} is missing the link to ${repo.url}`).toBeTruthy();
      }
    }

    for (const page of pages) {
      expect(anchors(page.html).filter((anchor) => anchor.href === '#')).toEqual([]);
    }
  });

  it('resolves every image and gives it non-empty alt text', () => {
    for (const page of pages) {
      for (const image of images(page.html)) {
        expect(image.alt?.trim().length, `${page.route} image ${image.src}`).toBeGreaterThan(0);

        const file = path.join(distDir, image.src.replace(/^\//, ''));
        expect(fs.existsSync(file), `${page.route} references missing ${image.src}`).toBe(true);
      }
    }
  });

  it('never publishes the phone number', () => {
    for (const page of pages) {
      expect(page.html).not.toMatch(/\+213|699\s?078\s?698/);
    }
  });

  it('keeps excluded work out of the built site', () => {
    const excluded = ['Zmala', 'Dirassati', 'MPI', 'HPCG', 'Olympics', 'olympics-dashboard'];

    for (const page of pages) {
      for (const term of excluded) {
        expect(textContent(page.html)).not.toContain(term);
      }
    }
  });

  it('carries the full name on every page', () => {
    for (const page of pages) {
      expect(page.html).toContain('Medjahri Mohammed Safouane');
    }
  });

  it('links all four launch Projects from the home page', () => {
    const home = pages.find((page) => page.route === '')?.html ?? '';

    expect(projects).toHaveLength(4);
    for (const project of projects) {
      expect(anchors(home).some((anchor) => anchor.href === `/projects/${project.slug}`)).toBe(true);
    }
  });

  it('gives every route a unique title and description', () => {
    const titles = pages.map((page) => /<title>([^<]+)<\/title>/.exec(page.html)?.[1] ?? '');
    const descriptions = pages.map(
      (page) => /<meta name="description" content="([^"]*)"/.exec(page.html)?.[1] ?? ''
    );

    expect(new Set(titles).size).toBe(pages.length);
    expect(new Set(descriptions).size).toBe(pages.length);
    expect(titles.every(Boolean)).toBe(true);
    expect(descriptions.every(Boolean)).toBe(true);
  });

  it('emits canonical, Open Graph, Twitter and Person metadata on every route', () => {
    for (const page of pages) {
      expect(page.html).toMatch(/<link rel="canonical" href="https:\/\//);
      expect(page.html).toContain('property="og:title"');
      expect(page.html).toContain('property="og:image"');
      expect(page.html).toContain('name="twitter:card"');
      expect(page.html).toContain('"@type":"Person"');
    }
  });

  it('ships a sitemap, a social preview and no tracking', () => {
    expect(fs.existsSync(path.join(distDir, 'sitemap-index.xml'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'og.png'))).toBe(true);

    for (const page of pages) {
      expect(page.html).not.toMatch(/googletagmanager|gtag\(|plausible|posthog|hotjar/i);
    }
  });
});
