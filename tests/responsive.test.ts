import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const distDir = path.join(root, 'dist');

const routes = ['', 'projects', 'about', '404'];

function htmlFor(route: string): string {
  if (route === '404') return fs.readFileSync(path.join(distDir, '404.html'), 'utf8');

  const file =
    route === '' ? path.join(distDir, 'index.html') : path.join(distDir, route, 'index.html');

  return fs.readFileSync(file, 'utf8');
}

function stylesheet(): string {
  const dir = path.join(distDir, '_astro');

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => fs.readFileSync(path.join(dir, file), 'utf8'))
    .join('\n');
}

describe('responsive contract', () => {
  it('declares a device-width viewport on every page', () => {
    for (const route of routes) {
      expect(htmlFor(route), route || '/').toContain(
        'name="viewport" content="width=device-width, initial-scale=1"'
      );
    }
  });

  it('keeps mobile tap targets at 44px and raises the small labels', () => {
    const css = stylesheet();

    expect(css).toMatch(/@media\s*\(width\s*<=\s*1023px\)/);
    expect(css).toMatch(/min-height:\s*2\.75rem/);
    expect(css).toMatch(/\.footer-link\{[^}]*display:inline-flex/);
    expect(css).toMatch(/\.label\{font-size:\.7rem\}/);
    expect(css).toMatch(/\.eyebrow\{font-size:\.72rem\}/);
  });

  it('starts the two-column hero at the tablet breakpoint and clamps the project title', () => {
    const home = htmlFor('');
    const css = stylesheet();

    expect(home).toContain('md:grid-cols-2');
    expect(home).toContain('footer-link');
    expect(css).toMatch(/\.h-project\{[^}]*clamp\(1\.75rem/);
  });
});
