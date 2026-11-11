import { describe, expect, it } from 'vitest';
import { assertProjectAssets } from '../src/lib/content-guards';

function project(overrides: Partial<{ id: string; title: string; cover: string; gallery: string[] }> = {}) {
  return {
    id: overrides.id ?? 'pocket-omr',
    data: {
      title: overrides.title ?? 'Pocket OMR',
      cover: { src: overrides.cover ?? '/favicon.svg' },
      gallery: (overrides.gallery ?? []).map((src) => ({ src })),
    },
  };
}

describe('Project asset guard', () => {
  it('accepts Projects whose images exist', () => {
    expect(() => assertProjectAssets([project()])).not.toThrow();
  });

  it('rejects an image that is not on disk, naming the Project and the path', () => {
    expect(() =>
      assertProjectAssets([project({ cover: '/projects/pocket-omr/missing.webp' })])
    ).toThrowError(/Pocket OMR[\s\S]*missing\.webp/);
  });

  it('rejects a duplicate Project slug', () => {
    expect(() => assertProjectAssets([project(), project({ title: 'Duplicate' })])).toThrowError(
      /Duplicate Project slug/
    );
  });
});
