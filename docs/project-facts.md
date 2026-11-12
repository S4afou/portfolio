# Project facts and claims ledger

Extracted from the notebooks, reports, code, and cover sources on disk. This is the evidence base for site copy: every number published on the site must appear in this file.

## Project names and ownership

| Page | Full title (`h1`) | Short title (cards, breadcrumb, nav) | Ownership |
| --- | --- | --- | --- |
| `pocket-omr` | Pocket OMR: End-to-End Optical Mark Recognition with Handwritten Character Identification | Pocket OMR | Team of six. All six shared collection, cleaning, and annotation. The owner led the box-detection approaches, built the OpenCV rectification and segmentation stages, and trained the MobileNetV3-Small bubble classifier. |
| `spell-caster` | Spell Caster: Voice-Driven RPG with Emotion-Aware Spell Casting | Spell Caster | Two-person project. The owner built the ASR and emotion pipeline and the local FastAPI server; the Unity game was the teammate's work, integrated together. |
| `h-gate` | H-GATE: Harris-Hawks-Optimized Gradient-boosted Attention-Transformer Ensemble | H-GATE | Solo project. The owner built the four base learners, the out-of-fold stacking pipeline, the Harris Hawks search, and the five-fold evaluation. |
| `shuttle-anomaly-detection` | Shuttle Telemetry Anomaly Detection with an MLOps Retraining Loop | Shuttle anomaly detection | Solo project. The owner built the detector, the Weights & Biases sweep and model registry, the retraining trigger, and the Streamlit interface. |
| `adain-style-transfer` | AdaIN Style Transfer: Arbitrary Neural Style Transfer with Adaptive Instance Normalization | AdaIN Style Transfer | Team of four. The owner implemented the AdaIN architecture from scratch and owned the multi-GPU training runs, checkpointing, and the inference benchmark. |
| `eigenfaces-fisherfaces` | Eigenfaces & Fisherfaces: Classical Face Recognition on Olivetti Faces | Eigenfaces & Fisherfaces | Team of four. The owner owned classification and evaluation. The Fisherfaces implementation and its 99.0% result were Aini Ines's. |

### Team-size corrections

- **H-GATE is solo.** The course deck lists four authors, but the owner did the implementation and evaluation alone. The site's ownership line says solo.
- **Spell Caster is two-person.** The deck lists four authors, but the actual split was the owner on ASR/SER/FastAPI and one teammate on the Unity game. The site says two-person.
- Pocket OMR remains a team of six; all six shared data collection, cleaning, and annotation. The owner's scope is box detection, OpenCV segmentation, and the MobileNetV3-Small bubble classifier. CNN_OMR was the team's chosen classifier; the YOLOv8s end-to-end detector was a team comparison and was rejected.
- AdaIN and Eigenfaces remain teams of four, as recorded in their reports.

## Claims ledger

| Project | CV claim | Evidence found | Site copy |
| --- | --- | --- | --- |
| NASA | "99% accuracy" | Best logged run `f1_anomaly` **0.9787**; no accuracy logged. `shuttle_ocsvm_99f1.pkl` has no supporting code or run. | "F1 0.979 on the anomaly class"; never accuracy, never 99% |
| H-GATE | Ensemble superiority | +0.16 pp accuracy vs vanilla XGBoost (baseline macro-F1 0.9839); macro-AUC is *lower* (0.9984 vs 0.9993). Macro-F1 0.9856 vs 0.9839 is +0.17 pp. | Lead with macro-F1 0.9856 and macro-FPR 0.37%; compare honestly to a strong baseline; call the F1 gain 0.17 pp. |
| Spell Caster | "Whisper-LoRA dual ASR+SER" | LoRA is fine-tuned for **emotion only**; transcription uses stock Whisper-Small. | "LoRA-tuned emotion head on Whisper-Small; transcription uses the base model" |
| Spell Caster | "latency under 2s" | Only measured figure is the Conformer CPU batch-1 latency: 38.5 ms FP32, 19.3 ms INT8. Whisper path unmeasured. | Use the measured Conformer numbers; do not claim a Whisper latency |
| AdaIN | "150 ms inference" | Report: 150 ms per 512×512 image on one T4, measured after warm-up with `torch.cuda.synchronize()`. The 15 to 30 FPS at 256 px figure is an **expected** video throughput, not measured. | "150 ms at 512×512 (measured); 15 to 30 FPS at 256 px (expected)" |
| Fisherfaces | "105× compression" | Report: Fisherfaces peaks at 99.0% with 39 final dimensions. The **54×** reduction belongs to the 75-component Eigenfaces model (4,096 / 75 ≈ 54.6), not to the 39-dimensional Fisherfaces configuration. | "Eigenfaces: 54× fewer dimensions at 75 components; Fisherfaces: 99.0% at 39 dimensions". Never attach 54× or 105× to the wrong configuration |
| Pocket OMR | "near-perfect" character recognition | No numeric metric for the character ensemble anywhere | Omit the number; use YOLOv8m-seg mAP@50 99.5, MobileNetV3-Small 98.98% / F1 98.31, and the rejected YOLOv8s at 30.2% answer accuracy |
| Pocket OMR | Owner did "the bubble-detection models" | The owner tried **MobileNetV3-Small** (98.98% accuracy, 1.78M parameters). CNN_OMR was the team's chosen classifier; YOLOv8s was a team comparison rejected at 30.2% answer accuracy. | Say the owner trained MobileNetV3-Small; attribute CNN_OMR and the YOLOv8s rejection to the team. |
| Contact | The email button works everywhere | On localhost, clicking "Email me" does nothing when the environment has no registered mail handler. The `mailto:` href itself is correct: `mailto:ms.medjahri@esi-sba.dz?subject=...`. | Keep the real `mailto:` link, add the visible address and a "Copy email" button with a clipboard fallback. |

## Per-project evidence

### Pocket OMR
Custom-collected dataset (dataset folder no longer on disk). Pipeline: OpenCV sheet normalisation (marker warp to 1240×1754, QR orientation, shadow removal, CLAHE+Otsu) → YOLOv8m-seg 8-class region segmentation → CNN_OMR bubble classifier → three-model character ensemble (EfficientNetV2-S, SimpleCNN_SE, MobileNetV3-S) with EMNIST pre-training and soft-voting. Deployed via FastAPI + React + Flutter, Docker, T4.
Numbers: YOLOv8m-seg P 99.8 / R 100.0 / mAP@50 99.5 / mAP@50-95 96.0 (box). MobileNetV3-Small bubble candidate: accuracy 98.98, F1 98.31, ROC-AUC 99.96, 1.78M parameters. The final service kept CNN_OMR. The YOLOv8s bubble variant was rejected at 30.2% answer accuracy, 94% recall, and 57 to 59% precision. The OpenCV contour pipeline took twelve iterations before YOLOv8m-seg replaced the region-segmentation stage.
Assets: `Report\Diagrams\*`, `Report\report_plots\*`, `Report\plots\*`, `Report\OMR YOLO bubble detection\*`.

### H-GATE
ISCX-URL2016, 36,707 rows, 5 classes. 5-fold out-of-fold stacking: FT-Transformer + focal-loss LightGBM + XGBoost + CatBoost, logistic meta-learner, SMOTE-NC, per-class thresholds (recall floor 0.90), Harris Hawks hyperparameter search, SHAP. Metrics: accuracy 0.9854, macro-F1 0.9856, macro-FPR 0.0037, macro-AUC 0.9984; vanilla XGBoost macro-F1 0.9839 and macro-AUC 0.9993.
Caveat: metrics are out-of-fold on the full dataset, not an independent test set. The course deck lists four authors, but the implementation was solo.
Assets: evidence charts embedded as base64 in the notebook; extract from the `.ipynb` JSON. Otherwise only `HGATE_Presentation.pptx`.

### NASA Shuttle anomaly detection + MLOps
OpenML `shuttle`, 55,941 rows × 9 cols. Scaler + LocalOutlierFactor(novelty=True) fitted on normal rows only; W&B Bayesian sweep over `n_neighbors` and `contamination`; model registry; 5-batch auto-retrain triggered at production F1 < 0.80; Streamlit UI with LOF/iForest/OCSVM switch and live W&B logging. Best sweep F1 0.9787; production F1 fell to 0.4324 under injected synthetic drift and the retrain trigger fired. The drift-and-retrain arc is the strongest part of the story.
Assets: the monitoring chart is generated from the logged baseline and drift runs. There are no project screenshots.

### Spell Caster
CREMA-D (SER, 6 emotions) + LibriSpeech (ASR). Two models: from-scratch Conformer (5.05M params) with CTC + attention-pooling SER head; Whisper-Small + LoRA (0.73% of params trainable) with a 6-class emotion head. Kendall uncertainty weighting, ONNX INT8 export. FastAPI `/cast_spell` returns spell + emotion, neutral fallback below 0.35 confidence.
Numbers: Whisper-Small+LoRA WER 0.0015, CER 0.0011, emotion accuracy 0.7584, emotion F1 0.7543. Conformer WER 0.1128, emotion accuracy 0.5383, emotion F1 0.5253. Conformer CPU latency 38.5 ms FP32 → 19.3 ms INT8. The Whisper path was not benchmarked on CPU.
Assets: `E:\All\Studies\Final\Images\` (architecture diagrams, confusion matrices, latency plot, gameplay screenshots, two `.mp4` recordings). The cover is the ice-cast frame; the fireball frame is kept in the gallery.

### AdaIN style transfer
Report: `E:\All\Studies\AdaIN report.pdf` (May 2026). Team of four; the owner implemented the AdaIN architecture from scratch and owned the multi-GPU training runs, checkpointing, and inference benchmark.
Model: frozen VGG-19 encoder to `relu4_1`, AdaIN alignment, trained decoder. MS-COCO content and WikiArt style images. Content loss plus style loss across four layers; style weight 10. Final configuration: batch 32, 40,000 iterations, 2× T4, DataParallel, learning rate 4e-4 decaying to 2e-4. Earlier batch-8/160,000 (1× T4) and batch-64/20,000 (2× T4) runs are comparison points; batch 64 was not selected.
Measured: 150 ms per 512×512 image on one T4 after warm-up (encoding + AdaIN + decoding). Expected, not measured: 15 to 30 FPS at 256 px for the planned video extension. The video path is frame-by-frame and has no temporal-consistency mechanism.
Caveat: the batch-8 vs batch-32 comparison also changes GPU count, so it cannot isolate batch size.
Assets: report Figure 2 (loss curves), Figure 3 (6×6 grid), Figure 4 (α interpolation). The 6×6 grid is kept as `grid.webp` in the gallery.

### Eigenfaces / Fisherfaces
Report: `E:\All\Studies\Eigenfaces_PCA_Report.pdf`. Team of four; the owner owned the classification stage and evaluation (PCA component sweep, 1-NN/linear-SVM comparison, confusion matrix, raw-pixel baseline, noise tests, 5-fold CV). The Fisherfaces implementation was Aini Ines's; the 99.0% result is a project result, not solo work.
Dataset: Olivetti Faces, 400 images, 40 subjects, ten images each, 64×64 grayscale (4,096 features), 75%/25% stratified train/test split (roughly 7 to 8 training images per subject).
Results: best Eigenfaces configuration PCA k=75 + linear SVM, 98.0% test accuracy, 54× fewer dimensions than 4,096. 5-fold stratified CV: 97.25% ± 1.22%. Raw pixels + linear SVM: 97.00%; PCA and raw pixels are statistically indistinguishable. GridSearchCV selected (k=50, C=0.1) at 96.0%. Fisherfaces (PCA 150 + LDA + SVM) peaks at 99.0% with 39 final dimensions (at most C-1 directions for 40 classes). Noise robustness decreases with added Gaussian noise.
Caveat: the 98.0% and 99.0% figures are single held-out split results; 97.25% is the cross-validated estimate for the Eigenfaces pipeline. Do not attach the 54× compression ratio to the 39-dimensional Fisherfaces configuration.

## Research citations on the site

### H-GATE
- Heidari et al. (2019), “Harris Hawks Optimization: Algorithm and Applications,” Future Generation Computer Systems.
- Gorishniy et al. (2021), “Revisiting Deep Learning Models for Tabular Data,” NeurIPS.
- Chen & Guestrin (2016), “XGBoost: A Scalable Tree Boosting System,” KDD.
- Ke et al. (2017), “LightGBM: A Highly Efficient Gradient Boosting Decision Tree,” NeurIPS.
- Prokhorenkova et al. (2018), “CatBoost: Unbiased Boosting with Categorical Features,” NeurIPS.
- Lin et al. (2017), “Focal Loss for Dense Object Detection,” ICCV.
- Chawla et al. (2002), “SMOTE: Synthetic Minority Over-sampling Technique,” JAIR.
- Lundberg & Lee (2017), “A Unified Approach to Interpreting Model Predictions,” NeurIPS.

### Spell Caster
- Radford et al. (2023), “Robust Speech Recognition via Large-Scale Weak Supervision,” ICML.
- Gulati et al. (2020), “Conformer: Convolution-augmented Transformer for Speech Recognition,” Interspeech.
- Hu et al. (2021), “LoRA: Low-Rank Adaptation of Large Language Models,” ICLR.
- Cao et al. (2014), “CREMA-D: Crowd-sourced Emotional Multimodal Actors Dataset,” IEEE Transactions on Affective Computing.
- Kendall et al. (2018), “Multi-Task Learning Using Uncertainty to Weigh Losses for Scene Geometry and Semantics,” CVPR.

### Pocket OMR
- Ultralytics (2023), “YOLOv8 segmentation models.”
- Howard et al. (2019), “Searching for MobileNetV3,” ICCV.
- Tan & Le (2021), “EfficientNetV2: Smaller Models and Faster Training,” ICML.
- Cohen et al. (2017), “EMNIST: Extending MNIST to Handwritten Letters,” IJCNN.
- Bradski (2000), “The OpenCV Library,” Dr. Dobb's Journal of Software Tools.

### Shuttle anomaly detection
- Breunig et al. (2000), “LOF: Identifying Density-Based Local Outliers,” SIGMOD.
- Liu et al. (2008), “Isolation Forest,” ICDM.
- Schölkopf et al. (2001), “Estimating the Support of a High-Dimensional Distribution,” Neural Computation.
- Gama et al. (2014), “A Survey on Concept Drift Adaptation,” ACM Computing Surveys.
- Sculley et al. (2015), “Hidden Technical Debt in Machine Learning Systems,” NeurIPS.

### AdaIN style transfer
- Gatys et al. (2015), “A Neural Algorithm of Artistic Style,” arXiv.
- Johnson et al. (2016), “Perceptual Losses for Real-Time Style Transfer and Super-Resolution,” ECCV.
- Huang & Belongie (2017), “Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization,” ICCV.
- Ulyanov et al. (2016), “Instance Normalization: The Missing Ingredient for Fast Stylization,” arXiv.
- Dumoulin et al. (2017), “A Learned Representation for Artistic Style,” ICLR.

### Eigenfaces / Fisherfaces
- Turk & Pentland (1991), “Eigenfaces for Recognition,” Journal of Cognitive Neuroscience.
- Belhumeur et al. (1997), “Eigenfaces vs. Fisherfaces: Recognition Using Class Specific Linear Projection,” IEEE TPAMI.
- Martínez & Kak (2001), “PCA versus LDA,” IEEE TPAMI.
- AT&T Laboratories Cambridge, “The Olivetti Faces Dataset.”

## Cover and image sources

- **Portrait**: personal photograph supplied by the owner, `E:\All\Studies\new_picture.jpg`; cropped to 4:5 and exported as `public/portrait.webp`. Not an external stock image.
- **H-GATE cover**: “A dell laptop computer with a red screen,” photograph by Ed Hardie, Unsplash License. `https://unsplash.com/photos/a-dell-laptop-computer-with-a-red-screen-1C5F88Af9ZU` (image `photo-1642783327704-2500e96fe3d9`). Cropped to 16:9.
- **Pocket OMR cover**: “A person writing on white paper using pencil,” photograph by Andy Barbour, Pexels License. `https://www.pexels.com/photo/a-person-writing-on-white-paper-using-pencil-6684265/` (image 6684265). Cropped to 16:9.
- **Spell Caster cover**: the ice-cast gameplay frame from `E:\All\Studies\Final\Images\`; no external licence applies. The old fireball cover is kept as `public/projects/spell-caster/fire-cast.webp` and used in the gallery.
- **NASA Shuttle cover**: “S132E007637 - STS-132 - Controls Panels in the FWD FD on Space Shuttle Atlantis,” NASA, public domain, via Wikimedia Commons. `https://commons.wikimedia.org/wiki/File:S132E007637_-_STS-132_-_Controls_Panels_in_the_FWD_FD_on_Space_Shuttle_Atlantis_during_STS-132_-_DPLA_-_14291ba505dacafe34098c8137d2d2a8.jpg`. Cropped to 16:9.
- **AdaIN cover**: Vincent van Gogh, “Wheatfield with Crows” (1890), public domain, via Wikimedia Commons. `https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg`. This is a style reference, not a model output. The report's 6×6 output grid is kept as `public/projects/adain-style-transfer/grid.webp` and used in the gallery.
- **Eigenfaces cover**: “A man's face in dramatic black and white lighting,” photograph by maks_d, Unsplash License. `https://unsplash.com/photos/a-mans-face-in-dramatic-black-and-white-lighting-ODVspOTOmu0` (image `photo-1761144863268-219ece9568ce`). A stock portrait, not an Olivetti subject; the dataset's own subject plate is kept as `public/projects/eigenfaces-fisherfaces/subject.webp` and used in the gallery.
- **Report figures**: AdaIN loss curves, α interpolation, and the 6×6 grid; Eigenfaces reconstruction, eigenfaces, confusion matrix, Fisherfaces, comparison, and the subject plate; Pocket OMR architecture, segmentation, name recognition, and per-field metrics; H-GATE confusion matrix, ROC, and class distribution; NASA monitoring chart; Spell Caster architecture, confusion matrix, and latency plot. These come from the reports and notebooks and are the owner's or the team's own material.
- **Spell Caster gameplay**: ice-cast and fire-cast frames from the Unity build; no external licence applies.

## Asset gaps
- H-GATE has no project screenshots; the evidence charts were recovered from notebook base64, and the cover is thematic photography.
- NASA has no project screenshots; the cover is the STS-132 flight deck and the monitoring chart is generated.
- Pocket OMR's raw dataset is gone, so nothing can be re-run; use the existing plots.
- AdaIN's video extension was planned, not delivered; keep the throughput figure labelled “expected”.
- The old H-GATE server-rack cover, Pocket OMR original/rectified cover, and NASA launch cover were replaced and are not kept in the repo.
