---
title: Eigenfaces & Fisherfaces
summary: A face-recognition study on Olivetti Faces, with PCA eigenfaces at 98.0% using 54× fewer dimensions and Fisherfaces at 99.0%, plus cross-validation that tempers both claims.
ownership: 'Team of four. I owned the classification stage and evaluation: the PCA component sweep, 1-NN and linear-SVM comparison, confusion matrix, raw-pixel baseline, noise tests, and 5-fold cross-validation. The Fisherfaces implementation and its 99.0% result were a teammate’s; I include them as the project’s strongest comparison.'
timeframe: '2026'
stack:
  - Python
  - scikit-learn
  - PCA
  - LDA
  - SVM
  - NumPy
  - Matplotlib

problem: >-
  Classical face recognition has to identify 40 people from 64×64 grayscale
  images with only about seven training photographs per person. The question is
  whether a linear projection can preserve identity while discarding
  expression, lighting, and noise.

approach:
  - >-
    Split the 400 Olivetti images stratified by subject: 75% training, 25% test,
    with a fixed random seed.
  - >-
    Fit PCA on the training set and sweep the number of components for both
    1-NN and linear SVM classifiers, then run a joint GridSearchCV over
    components and SVM hyperparameters.
  - >-
    Build raw-pixel baselines to separate the effect of the classifier from the
    effect of dimensionality reduction.
  - >-
    Evaluate the best configuration with macro precision, recall, F1, a
    confusion matrix, and 5-fold stratified cross-validation.
  - >-
    Add zero-mean Gaussian noise of increasing standard deviation, and compare
    pure Eigenfaces with the supervised Fisherfaces extension (PCA + LDA).

results:
  - name: Fisherfaces accuracy
    value: '99.0%'
    context: 39 final dimensions (PCA 150 + LDA), single held-out split
  - name: Eigenfaces accuracy
    value: '98.0%'
    context: PCA k=75 + linear SVM, 54× fewer than 4,096
  - name: Cross-validated accuracy
    value: '97.25%'
    context: 5-fold stratified CV, ± 1.22 percentage points

reflection: >-
  The 98.0% single-split result was 0.75 points above the 97.25%
  cross-validated mean, and PCA was statistically indistinguishable from raw
  pixels at 97.00%. The honest headline is equivalent accuracy with 54× fewer
  dimensions, not a better classifier. I would lead with cross-validation,
  treat a single split as a noisy estimate, and test a nonlinear model before
  calling linear methods the ceiling.

cover:
  src: /projects/eigenfaces-fisherfaces/cover.webp
  alt: Ten photographs of one person from the Olivetti Faces dataset, showing changes in expression and lighting.
  caption: One subject’s ten images from Olivetti Faces — the intra-class variation the classifier has to ignore.

gallery:
  - src: /projects/eigenfaces-fisherfaces/reconstruction.webp
    alt: A test face reconstructed from an increasing number of principal components, from 1 to 300.
    caption: Reconstruction improves quickly and flattens near 100 components; the 75-component classifier sits on the flat part of the curve.
  - src: /projects/eigenfaces-fisherfaces/eigenfaces.webp
    alt: The top sixteen eigenfaces, each annotated with its share of the total variance.
    caption: The leading components capture lighting, pose, and broad shape; later ones pick up glasses and expression.
  - src: /projects/eigenfaces-fisherfaces/confusion.webp
    alt: A 40 by 40 confusion matrix for PCA k=75 with a linear SVM.
    caption: The matrix is almost diagonal; most errors involve a single subject.
  - src: /projects/eigenfaces-fisherfaces/fisherfaces.webp
    alt: The top sixteen Fisherfaces projected back into pixel space.
    caption: Fisherfaces encode between-subject differences rather than appearance, which is why they look noisier.
  - src: /projects/eigenfaces-fisherfaces/comparison.webp
    alt: A bar chart comparing raw pixels, Eigenfaces, tuned Eigenfaces, and Fisherfaces by test accuracy.
    caption: Fisherfaces reaches 99.0% with 39 dimensions; the tuned Eigenfaces model is the more statistically defensible 96.0% configuration.

repos:
  - label: GitHub repository
    status: pending

featured: false
order: 6
---
