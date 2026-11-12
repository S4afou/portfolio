export type FocusArea = {
  index: string;
  title: string;
  body: string;
};

/** The three interests shown on Home; MLOps is a delivery practice, not a headline area. */
export const FOCUS_AREAS: FocusArea[] = [
  {
    index: '01',
    title: 'Computer vision',
    body: 'Document understanding that starts with a phone photograph: rectification, segmentation, and reading the page the way a scanner would.',
  },
  {
    index: '02',
    title: 'Natural language processing',
    body: 'Transcription and emotion from real audio, and text models that have to cope with messy, spoken language rather than clean benchmarks.',
  },
  {
    index: '03',
    title: 'Deep learning',
    body: 'From-scratch architectures, transfer learning, and the training loops that make a model worth deploying, with evaluation treated as part of the result.',
  },
];

export const FOCUS_LABEL = 'Vision · NLP · Deep learning';
