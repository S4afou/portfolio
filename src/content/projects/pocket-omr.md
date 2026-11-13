---
title: 'Pocket OMR: End-to-End Optical Mark Recognition with Handwritten Character Identification'
shortTitle: Pocket OMR
summary: "A phone photo of an exam sheet becomes a graded answer sheet: rectification, region segmentation, bubble reading, and character recognition in one pipeline."
ownership: >-
  Team of six. All six shared collection, cleaning, and annotation. I led the
  box-detection approaches, built the OpenCV rectification and segmentation
  stages, and trained the MobileNetV3-Small bubble classifier.
timeframe: 'Mar to Jun 2026'
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

research:
  - citation: >-
      Ultralytics (2023), “YOLOv8 segmentation models.”
    takeaway: >-
      YOLOv8's segmentation head gave us one model for the eight form regions
      instead of a hand-built contour pipeline. The 99.5 mAP@50 is on our own
      annotated photographs, not a public benchmark, so it measures fit to our
      capture conditions.
  - citation: >-
      Howard et al. (2019), “Searching for MobileNetV3,” ICCV.
    takeaway: >-
      MobileNetV3-Small gave us an efficient bubble classifier: 98.98%
      accuracy at 1.78M parameters. The small footprint is why it was worth
      testing for a phone-photo pipeline, even though the team kept CNN_OMR
      for the final service.
  - citation: >-
      Tan & Le (2021), “EfficientNetV2: Smaller Models and Faster Training,”
      ICML.
    takeaway: >-
      The character ensemble used EfficientNetV2-S alongside SimpleCNN_SE and
      MobileNetV3-S. The ensemble was about covering different handwriting
      failure modes, not about one backbone winning.
  - citation: >-
      Cohen et al. (2017), “EMNIST: Extending MNIST to Handwritten Letters,”
      IJCNN.
    takeaway: >-
      EMNIST gave the character models a pretraining distribution closer to
      handwritten names and IDs than MNIST digits alone. It is still cleaner
      than a phone photo of a form.
  - citation: >-
      Bradski (2000), “The OpenCV Library,” Dr. Dobb's Journal of Software
      Tools.
    takeaway: >-
      OpenCV supplied the deterministic half of the pipeline: marker detection,
      perspective warp, shadow removal, and binarisation. Those operations are
      cheap and explainable, and they stayed even after deep segmentation
      replaced the contour stage.

comparison:
  - option: 'OpenCV rectification and contour-based region detection'
    strengths: >-
      Deterministic, needs no training data, and is easy to debug. It handled
      markers, perspective, and binarisation with classical operations.
    limits: >-
      It took twelve iterations to make robust and still broke on shadows,
      folds, and unusual layouts; every new capture condition added another
      special case.
    verdict: >-
      Kept for rectification and normalisation, replaced by YOLOv8m-seg for
      region segmentation.
  - option: 'YOLOv8m-seg region segmentation'
    strengths: >-
      99.5 mAP@50 on the annotated form regions. One model replaced the brittle
      contour stage and generalised across capture conditions.
    limits: >-
      Needs annotated photographs and a GPU at training time; the metric is on
      our own dataset, not a public benchmark.
    verdict: >-
      The right trade for this pipeline. The OpenCV stage stayed where it is
      deterministic and cheap.
  - option: 'Bubble reading: CNN_OMR, MobileNetV3-Small, and YOLOv8s'
    strengths: >-
      CNN_OMR was the team's chosen classifier. MobileNetV3-Small reached
      98.98% accuracy at 1.78M parameters. YOLOv8s offered end-to-end
      detection.
    limits: >-
      YOLOv8s was rejected at 30.2% answer accuracy (94% recall, 57 to 59%
      precision) because detecting a bubble is not reading which one is
      filled. The MobileNetV3-Small result is a candidate, not the shipped
      model.
    verdict: >-
      Keep detection and classification separate. The small classifier is
      promising, but the team kept CNN_OMR for the final service.
  - option: 'Character ensemble versus a single backbone'
    strengths: >-
      Soft voting across EfficientNetV2-S, SimpleCNN_SE, and MobileNetV3-S
      covers different handwriting failure modes.
    limits: >-
      Three models cost more to train and serve, and no per-model ablation is
      recorded, so the ensemble's gain is not isolated.
    verdict: >-
      Reasonable for accuracy, but the next step is an ablation, not another
      backbone.

approach:
  - >-
    Normalise the sheet first: detect the printed markers, warp to 1240×1754,
    correct QR orientation, remove shadows, and binarise with CLAHE and Otsu so
    every later stage sees a flat, upright page.
  - >-
    Segment eight form regions with YOLOv8m-seg, then classify each bubble. The
    team kept CNN_OMR for the final service; I trained the MobileNetV3-Small
    alternative.
  - >-
    Read printed and handwritten fields with a three-model character ensemble
    (EfficientNetV2-S, SimpleCNN_SE, MobileNetV3-S), pre-trained on EMNIST and
    combined by soft voting.
  - >-
    Serve the pipeline through FastAPI with React and Flutter clients,
    containerised with Docker and served on a T4.
  - >-
    The team also trained a YOLOv8s bubble detector end-to-end and rejected it:
    it reached 30.2% answer accuracy, because detecting a bubble is not the
    same as reading which one is filled.

contribution:
  - >-
    All six of us shared data collection, cleaning, and annotation; the dataset
    was custom-collected, so that work was the project.
  - >-
    I led the box-detection approaches: the OpenCV marker and region pipeline,
    the per-bubble box extraction, and the detection training pipeline that fed
    YOLOv8m-seg.
  - >-
    I built the OpenCV rectification and segmentation stages and trained the
    MobileNetV3-Small bubble classifier (98.98% accuracy, 1.78M parameters).
    The team kept CNN_OMR for the final service.
  - >-
    The YOLOv8s end-to-end detector was a team comparison, not my classifier; I
    keep it in the results because it explains why detection and classification
    stayed separate.

results:
  - name: mAP@50
    value: '99.5'
    context: Region segmentation, YOLOv8m-seg
  - name: Bubble accuracy
    value: '98.98%'
    context: MobileNetV3-Small candidate, 1.78M parameters
  - name: Bubble F1
    value: '98.31'
    context: MobileNetV3-Small candidate
  - name: Answer accuracy
    value: '30.2%'
    context: Rejected YOLOv8s bubble detector

reflection: >-
  The component metrics looked excellent while the end-to-end answer sheet was
  often wrong. A YOLOv8s detector that skipped segmentation scored 30.2% answer
  accuracy even though the segmentation model scored 99.5 mAP@50. I would
  instrument the full sheet from day one, keep a held-out set of real
  photographs, and treat correct answers per sheet as the only number that
  decides whether the pipeline works. The MobileNetV3-Small result looked
  strong in isolation, but the end-to-end sheet is what matters.

cover:
  src: /projects/pocket-omr/cover.webp
  alt: A hand filling in bubbles on a printed multiple-choice answer sheet with an orange pencil.
  caption: A phone photo of a bubble sheet is the input; the pipeline still has to survive perspective, shadow, and handwriting. Photograph by Andy Barbour, Pexels License.

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
  - label: GitHub organization
    url: https://github.com/pocket-omr
    status: published

featured: true
order: 1
---
