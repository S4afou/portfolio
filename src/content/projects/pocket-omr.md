---
title: Pocket OMR
summary: A phone photo of an exam sheet becomes a graded answer sheet — rectification, region segmentation, bubble reading, and character recognition in one pipeline.
ownership: 'Team of six. I owned data collection and cleaning, the detection training pipeline, and the segmentation and bubble-detection models.'
timeframe: '2025'
stack:
  - Python
  - PyTorch
  - YOLOv8m-seg
  - OpenCV
  - FastAPI
  - React
  - Flutter
  - Docker

problem: >-
  Grading multiple-choice exams means either marking hundreds of sheets by hand
  or buying a dedicated scanner. A phone camera is the only hardware most
  schools already have, but a photograph brings perspective, shadow, and
  rotation that a scanner never does.

approach:
  - >-
    Normalise the sheet first: detect the printed markers, warp to 1240×1754,
    correct QR orientation, remove shadows, and binarise with CLAHE and Otsu so
    every later stage sees a flat, upright page.
  - >-
    Segment eight form regions with YOLOv8m-seg, then classify each bubble with
    a MobileNetV3-S head.
  - >-
    Read printed and handwritten fields with a three-model character ensemble
    (EfficientNetV2-S, SimpleCNN_SE, MobileNetV3-S), pre-trained on EMNIST and
    combined by soft voting.
  - >-
    Serve the pipeline through FastAPI with React and Flutter clients,
    containerised with Docker and served on a T4.
  - >-
    I also trained a YOLOv8s bubble detector end-to-end and rejected it: it
    reached 30.2% answer accuracy, because detecting a bubble is not the same
    as reading which one is filled.

results:
  - name: mAP@50
    value: '99.5'
    context: Region segmentation, YOLOv8m-seg
  - name: Bubble F1
    value: '98.31'
    context: MobileNetV3-S classifier
  - name: Answer accuracy
    value: '30.2%'
    context: Rejected YOLOv8s bubble detector

reflection: >-
  The component metrics looked excellent while the end-to-end answer sheet was
  often wrong. A YOLOv8s detector that skipped segmentation scored 30.2% answer
  accuracy even though the segmentation model scored 99.5 mAP@50. I would
  instrument the full sheet from day one, keep a held-out set of real
  photographs, and treat correct answers per sheet as the only number that
  decides whether the pipeline works.

cover:
  src: /projects/pocket-omr/cover.webp
  alt: An exam sheet photographed at an angle beside the same sheet after rectification.
  caption: The original photograph and the rectified sheet the pipeline actually reads.

gallery:
  - src: /projects/pocket-omr/architecture.webp
    alt: System architecture, from React and Flutter clients through a FastAPI service to normalisation, segmentation, bubble classification, and character recognition.
    caption: One service owns the pipeline; the React and Flutter clients only upload a sheet and display the result.
  - src: /projects/pocket-omr/segmentation.webp
    alt: The segmentation pipeline showing the original photograph, the rectified sheet, and the eight detected form regions.
    caption: Marker detection and a perspective warp come before segmentation, so the model never sees a skewed page.
  - src: /projects/pocket-omr/name-recognition.webp
    alt: Samples of recognised names and identifiers taken from exam sheets.
    caption: Character recognition on real student handwriting, the noisiest part of the sheet.
  - src: /projects/pocket-omr/per-field-metrics.webp
    alt: Bar chart of detection metrics for each form field.
    caption: Per-field detection metrics. The weak fields are the reason the review interface exists.

repos:
  - label: GitHub repository
    status: pending

featured: true
order: 1
---
