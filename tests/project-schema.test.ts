import { describe, expect, it } from 'vitest';
import { projectSchema } from '../src/lib/project-schema';

// Fixture derived from the spec's required Project fields, not from the schema implementation.
const completeProject = {
  title: 'Pocket OMR',
  summary: 'Turning a phone photo of an exam sheet into a graded answer sheet.',
  ownership: 'Team of six. I owned data collection and the detection pipeline.',
  timeframe: '2025',
  stack: ['Python', 'PyTorch'],
  problem:
    'Grading multiple-choice exams means either marking hundreds of sheets by hand or buying a dedicated scanner.',
  approach: [
    'Normalise the sheet before reading anything, then segment the form regions with a trained model.',
    'Serve the pipeline through an API with a review interface.',
  ],
  results: [
    { name: 'mAP@50', value: '99.5', context: 'region segmentation' },
    { name: 'Bubble F1', value: '98.31', context: 'bubble classifier' },
  ],
  reflection:
    'The component metric looked excellent while the end-to-end answer sheet was mostly wrong, which taught me to measure the product.',
  cover: { src: '/projects/pocket-omr/cover.webp', alt: 'Exam sheet before and after rectification' },
  repos: [{ label: 'GitHub', status: 'pending' }],
  order: 1,
};

describe('Project schema', () => {
  it('accepts a complete Project', () => {
    expect(projectSchema.safeParse(completeProject).success).toBe(true);
  });

  it('rejects a published Repository that has no url', () => {
    const withPublishedRepo = {
      ...completeProject,
      repos: [{ label: 'GitHub', status: 'published' }],
    };

    expect(projectSchema.safeParse(withPublishedRepo).success).toBe(false);
  });

  it('rejects an image with empty alt text', () => {
    const withUnlabelledCover = {
      ...completeProject,
      cover: { src: '/projects/pocket-omr/cover.webp', alt: '' },
    };

    expect(projectSchema.safeParse(withUnlabelledCover).success).toBe(false);
  });

  it('rejects an image path that is not absolute', () => {
    const withRelativeCover = {
      ...completeProject,
      cover: { src: 'projects/pocket-omr/cover.webp', alt: 'Exam sheet' },
    };

    expect(projectSchema.safeParse(withRelativeCover).success).toBe(false);
  });

  it('names the missing field when frontmatter is incomplete', () => {
    const { title: _title, ...withoutTitle } = completeProject;
    const result = projectSchema.safeParse(withoutTitle);

    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path[0] === 'title')).toBe(true);
  });
});
