---
title: AdaIN Style Transfer
summary: A from-scratch AdaIN implementation that transfers arbitrary artistic styles in one feed-forward pass, at 150 ms per 512 px image on a single T4.
ownership: 'Team of four. I implemented the AdaIN architecture from scratch and owned the multi-GPU training runs, checkpointing, and the inference benchmark.'
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

results:
  - name: Inference time
    value: '150 ms'
    context: 512×512 image, one T4, measured after warm-up
  - name: Expected video throughput
    value: '15–30 FPS'
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
  alt: A cropped style-transfer grid from the AdaIN report, showing four content photographs down the rows and six WikiArt styles across the columns.
  caption: Detail of Figure 3 from the report, cropped for 16:9 — four of six content rows, six style images, α = 1.0.

gallery:
  - src: /projects/adain-style-transfer/losses.webp
    alt: Three training curves for total loss, content and style loss, and learning rate over 40,000 iterations.
    caption: Training loss over the final 40,000-iteration run. The decoder converges early, then improves slowly.
  - src: /projects/adain-style-transfer/interpolation.webp
    alt: Five versions of one content–style pair at alpha values from 0 to 1, showing increasing stylisation.
    caption: The α sweep interpolates in feature space. α = 0 returns the content image; α = 1 applies the full style.

repos:
  - label: GitHub repository
    status: pending

featured: false
order: 5
---
