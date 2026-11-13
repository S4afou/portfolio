---
title: 'AdaIN Style Transfer: Arbitrary Neural Style Transfer with Adaptive Instance Normalization'
shortTitle: AdaIN Style Transfer
summary: A from-scratch AdaIN implementation that transfers arbitrary artistic styles in one feed-forward pass, at 150 ms per 512 px image on a single T4.
ownership: >-
  Team of four. I implemented the AdaIN architecture from scratch and owned the
  multi-GPU training runs, checkpointing, and the inference benchmark.
timeframe: '2026'
stack:
  - Python
  - PyTorch
  - VGG-19
  - AdaIN
  - DataParallel
  - Hugging Face

problem: >-
  Iterative style transfer can take minutes per image, and feed-forward
  alternatives need a separate network for every style. A practical system has
  to handle an arbitrary style image in one pass, without a style-specific
  model.

research:
  - citation: >-
      Gatys et al. (2015), “A Neural Algorithm of Artistic Style,” arXiv.
    takeaway: >-
      Gatys framed style transfer as an optimisation over pixels using VGG
      feature statistics. It is the quality reference, but it takes minutes per
      image and has to optimise from scratch for every content-style pair.
  - citation: >-
      Johnson et al. (2016), “Perceptual Losses for Real-Time Style Transfer and
      Super-Resolution,” ECCV.
    takeaway: >-
      Johnson replaced the per-image optimisation with a feed-forward network
      trained on a perceptual loss. It is fast, but each network is tied to one
      style, so arbitrary style means training a new network per style.
  - citation: >-
      Huang & Belongie (2017), “Arbitrary Style Transfer in Real-time with
      Adaptive Instance Normalization,” ICCV.
    takeaway: >-
      AdaIN aligns the mean and variance of content features to the style
      features, so one decoder handles an arbitrary style in a single pass.
      That is the paper we implemented.
  - citation: >-
      Ulyanov et al. (2016), “Instance Normalization: The Missing Ingredient
      for Fast Stylization,” arXiv.
    takeaway: >-
      Instance normalisation is the operation AdaIN generalises. It removes
      per-image contrast statistics that would otherwise leak the content's
      style into the output.
  - citation: >-
      Dumoulin et al. (2017), “A Learned Representation for Artistic Style,”
      ICLR.
    takeaway: >-
      Conditional instance normalisation showed that one network can cover many
      styles by conditioning the normalisation. AdaIN removes the learned
      per-style parameters and uses the style image's statistics directly.

comparison:
  - option: 'Gatys optimisation'
    strengths: >-
      Highest flexibility: any content, any style, no training. The loss is
      direct and easy to reason about.
    limits: >-
      Minutes per image, and the optimisation is pair-specific, so it cannot
      support a real-time or video path.
    verdict: >-
      The quality reference, not the deployment path.
  - option: 'Johnson feed-forward network'
    strengths: >-
      One forward pass at inference; much faster than optimisation.
    limits: >-
      One network per style. Arbitrary style means retraining, which is the
      cost we wanted to avoid.
    verdict: >-
      A good real-time baseline, but not arbitrary.
  - option: 'AdaIN'
    strengths: >-
      One decoder, arbitrary style, 150 ms per 512×512 image on one T4 after
      warm-up, and an α interpolation parameter at inference.
    limits: >-
      Quality is below per-pair optimisation. The batch-8 and batch-32
      comparison is confounded by GPU count, and the video path is
      frame-by-frame.
    verdict: >-
      The right cost/flexibility trade for this project. I would not claim it
      matches optimisation quality.

approach:
  - >-
    Use a frozen VGG-19 encoder up to relu4_1; align the content feature
    statistics to the style statistics with AdaIN, and train only the decoder.
  - >-
    Train on MS-COCO content images and WikiArt style images with the content
    and style losses from the original paper, including the four-layer style
    loss and a style weight of 10.
  - >-
    Run the final configuration for 40,000 iterations at batch size 32 on two
    T4 GPUs, scaling the learning rate and using DataParallel across both.
  - >-
    Persist the decoder, optimizer state, and loss history to a Hugging Face
    repository at every checkpoint, then resume from the highest checkpoint
    when an ephemeral Kaggle session ends.
  - >-
    Benchmark a 512×512 forward pass on one T4 after warm-up with
    torch.cuda.synchronize(), and expose the α interpolation parameter at
    inference.

contribution:
  - >-
    I implemented the AdaIN encoder and decoder from scratch: frozen VGG-19 to
    relu4_1, the AdaIN alignment, and the decoder trained with the content and
    style losses.
  - >-
    I owned the 2×T4 DataParallel runs, the batch-8/32/64 comparisons,
    checkpointing to Hugging Face, and resume after ephemeral Kaggle sessions.
  - >-
    I wrote the 512×512 inference benchmark with warm-up and
    torch.cuda.synchronize(), and the α interpolation path.
  - >-
    The team shared the literature study and the report; the AdaIN
    implementation and training runs were my part.

results:
  - name: Inference time
    value: '150 ms'
    context: 512×512 image, one T4, measured after warm-up
  - name: Expected video throughput
    value: '15 to 30 FPS'
    context: 256 px frames, planned extension, not measured

reflection: >-
  The batch-8 and batch-32 comparison was confounded: batch 8 ran on one GPU and
  batch 32 on two, so I cannot attribute the quality difference to batch size. I
  would hold the hardware fixed, train closer to the paper's 160,000 iterations,
  and evaluate with a perceptual or user study instead of loss curves alone.
  The video path is still frame-by-frame, so temporal flicker remains
  unaddressed.

cover:
  src: /projects/adain-style-transfer/cover.webp
  alt: Vincent van Gogh's Wheatfield with Crows, a wide landscape of yellow wheat under a dark blue sky with black birds.
  caption: Vincent van Gogh, Wheatfield with Crows (1890). Public domain. A style reference, not a model output.

gallery:
  - src: /projects/adain-style-transfer/grid.webp
    alt: A 6×6 style-transfer grid with six content photographs down the rows and six WikiArt styles across the columns.
    caption: "The actual output grid: six content images, six styles, α = 1.0. The cover is the style reference, not this grid."
  - src: /projects/adain-style-transfer/losses.webp
    alt: Three training curves for total loss, content and style loss, and learning rate over 40,000 iterations.
    caption: Training loss over the final 40,000-iteration run. The decoder converges early, then improves slowly.
  - src: /projects/adain-style-transfer/interpolation.webp
    alt: Five versions of one content-style pair at alpha values from 0 to 1, showing increasing stylisation.
    caption: The α sweep interpolates in feature space. α = 0 returns the content image; α = 1 applies the full style.

repos:
  - label: GitHub repository
    url: https://github.com/S4afou/adain-style-transfer
    status: published

featured: false
order: 5
---
