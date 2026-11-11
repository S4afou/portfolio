export type MoreWorkEntry = {
  title: string;
  description: string;
  stack: string[];
};

// Deliberately data-only: More work entries never get a page of their own.
export const MORE_WORK: MoreWorkEntry[] = [
  {
    title: 'Real-Time Neural Style Transfer (AdaIN)',
    description:
      'Arbitrary style transfer implemented from scratch in PyTorch. Trained on MS-COCO and WikiArt on two T4 GPUs; runs at 15–30 FPS at 256 px.',
    stack: ['PyTorch', 'VGG-19', 'AdaIN'],
  },
  {
    title: 'Eigenfaces & Fisherfaces',
    description:
      'A comparison of linear face-recognition methods on Olivetti Faces. Fisherfaces reached 99.0% accuracy at 39 dimensions, a 54× reduction from the raw image space.',
    stack: ['scikit-learn', 'PCA', 'LDA'],
  },
];
