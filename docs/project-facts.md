# Project facts and claims ledger

Extracted from the notebooks, reports, and code on disk. This is the evidence base for site copy: every number published on the site must appear in this file.

## Claims ledger

| CV claim | Evidence found | Site copy |
| --- | --- | --- |
| NASA: "99% accuracy" | Best logged run `f1_anomaly` **0.9787**; no accuracy logged. `shuttle_ocsvm_99f1.pkl` has no supporting code or run. | "F1 0.979 on the anomaly class" — never accuracy, never 99% |
| H-GATE: ensemble superiority | +0.16 pp accuracy vs vanilla XGBoost (baseline macro-F1 0.9839); macro-AUC is *lower* (0.9984 vs 0.9993) | Lead with macro-F1 0.986 and macro-FPR 0.37%; compare honestly to a strong baseline |
| Spell Caster: "Whisper-LoRA dual ASR+SER" | LoRA is fine-tuned for **emotion only**; transcription uses stock Whisper-Small | "LoRA-tuned emotion head on Whisper-Small; transcription uses the base model" |
| Spell Caster: "latency under 2s" | Only measured figure: Conformer CPU batch-1 — 38.5 ms FP32, 19.3 ms INT8. Whisper path unmeasured. | Use the measured Conformer numbers; do not claim a Whisper latency |
| AdaIN: "150 ms inference" | Report: 150 ms per 512×512 image on one T4, measured after warm-up with `torch.cuda.synchronize()`. The 15–30 FPS at 256 px figure is an **expected** video throughput, not measured. | "150 ms at 512×512 (measured); 15–30 FPS at 256 px (expected)" |
| Fisherfaces: "105× compression" | Report: Fisherfaces peaks at 99.0% with 39 final dimensions. The **54×** reduction belongs to the 75-component Eigenfaces model (4,096 / 75 ≈ 54.6), not to the 39-dimensional Fisherfaces configuration. | "Eigenfaces: 54× fewer dimensions at 75 components; Fisherfaces: 99.0% at 39 dimensions" — never attach 54× or 105× to the wrong configuration |
| Pocket OMR: "near-perfect" character recognition | No numeric metric for the character ensemble anywhere | Omit the number; use YOLOv8m-seg mAP@50 99.5 and bubble F1 98.31 |

## Per-project evidence

### Pocket OMR
Custom-collected dataset (dataset folder no longer on disk). Pipeline: OpenCV sheet normalisation (marker warp to 1240×1754, QR orientation, shadow removal, CLAHE+Otsu) → YOLOv8m-seg 8-class region segmentation → CNN bubble classifier → three-model character ensemble (EfficientNetV2-S, SimpleCNN_SE, MobileNetV3-S) with EMNIST pre-training and soft-voting. Deployed via FastAPI + React + Flutter, Docker, T4.
Numbers: YOLOv8m-seg P 99.8 / R 100.0 / mAP@50 99.5 / mAP@50-95 96.0 (box). Bubble classifier MobileNetV3-S: accuracy 98.98, F1 98.31, ROC-AUC 99.96. A YOLOv8s bubble variant was rejected at 30.2% answer accuracy — a useful "what I rejected" note.
Assets: `Report\Diagrams\*`, `Report\report_plots\*`, `Report\plots\*`, `Report\OMR YOLO bubble detection\*`.

### H-GATE
ISCX-URL2016, 36,707 rows, 5 classes. 5-fold out-of-fold stacking: FT-Transformer + focal-loss LightGBM + XGBoost + CatBoost, logistic meta-learner, SMOTE-NC, per-class thresholds (recall floor 0.90), Harris Hawks hyperparameter search, SHAP. Metrics: accuracy 0.9854, macro-F1 0.9856, macro-FPR 0.0037.
Caveat: metrics are out-of-fold on the full dataset, not an independent test set.
Assets: evidence charts embedded as base64 in the notebook; extract from the `.ipynb` JSON. The cover is the NERSC photograph listed below. Otherwise only `HGATE_Presentation.pptx`.

### NASA Shuttle anomaly detection + MLOps
OpenML `shuttle`, 55,941 rows × 9 cols. Scaler + LocalOutlierFactor(novelty=True) fitted on normal rows only; W&B Bayesian sweep over `n_neighbors` and `contamination`; model registry; 5-batch auto-retrain triggered at production F1 < 0.80; Streamlit UI with LOF/iForest/OCSVM switch and live W&B logging. Best sweep F1 0.9787; production F1 fell to 0.4324 under injected synthetic drift and the retrain trigger fired. The drift-and-retrain arc is the strongest part of the story.
Assets: the cover is the NASA STS-132 photograph listed below; the monitoring chart is generated from the logged baseline and drift runs. There are no project screenshots.

### Spell Caster
CREMA-D (SER, 6 emotions) + LibriSpeech (ASR). Two models: from-scratch Conformer (5.05M params) with CTC + attention-pooling SER head; Whisper-Small + LoRA (0.73% of params trainable) with a 6-class emotion head. Kendall uncertainty weighting, ONNX INT8 export. FastAPI `/cast_spell` returns spell + emotion, neutral fallback below 0.35 confidence.
Numbers: Whisper-Small+LoRA WER 0.0015, CER 0.0011, emotion accuracy 0.7584, emotion F1 0.7543. Conformer WER 0.1128, emotion accuracy 0.5383. Conformer CPU latency 38.5 ms FP32 → 19.3 ms INT8.
Assets: `E:\All\Studies\Final\Images\` (architecture diagrams, confusion matrices, latency plot, gameplay screenshots, two `.mp4` recordings).

### AdaIN style transfer
Report: `E:\All\Studies\AdaIN report.pdf` (May 2026). Team of four; the owner implemented the AdaIN architecture from scratch and owned the multi-GPU training runs, checkpointing, and inference benchmark.
Model: frozen VGG-19 encoder to `relu4_1`, AdaIN alignment, trained decoder. MS-COCO content and WikiArt style images. Content loss plus style loss across four layers; style weight 10. Final configuration: batch 32, 40,000 iterations, 2× T4, DataParallel, learning rate 4e-4 decaying to 2e-4. Earlier batch-8/160,000 (1× T4) and batch-64/20,000 (2× T4) runs are comparison points; batch 64 was not selected.
Measured: 150 ms per 512×512 image on one T4 after warm-up (encoding + AdaIN + decoding). Expected, not measured: 15–30 FPS at 256 px for the planned video extension. The video path is frame-by-frame and has no temporal-consistency mechanism.
Caveat: the batch-8 vs batch-32 comparison also changes GPU count, so it cannot isolate batch size.
Assets: report Figure 2 (loss curves), Figure 3 (6×6 grid), Figure 4 (α interpolation).

### Eigenfaces / Fisherfaces
Report: `E:\All\Studies\Eigenfaces_PCA_Report.pdf`. Team of four; the owner owned the classification stage and evaluation (PCA component sweep, 1-NN/linear-SVM comparison, confusion matrix, raw-pixel baseline, noise tests, 5-fold CV). The Fisherfaces implementation was a teammate's; the 99.0% result is a project result, not solo work.
Dataset: Olivetti Faces, 400 images, 40 subjects, 64×64 grayscale (4,096 features), 75%/25% stratified train/test split.
Results: best Eigenfaces configuration PCA k=75 + linear SVM, 98.0% test accuracy, 54× fewer dimensions than 4,096. 5-fold stratified CV: 97.25% ± 1.22%. Raw pixels + linear SVM: 97.00%; PCA and raw pixels are statistically indistinguishable. GridSearchCV selected (k=50, C=0.1) at 96.0% — lower on the single split but more defensible. Fisherfaces (PCA 150 + LDA + SVM) peaks at 99.0% with 39 final dimensions (at most C−1 directions for 40 classes). Noise robustness decreases with added Gaussian noise.
Caveat: the 98.0% and 99.0% figures are single held-out split results; 97.25% is the cross-validated estimate for the Eigenfaces pipeline. Do not attach the 54× compression ratio to the 39-dimensional Fisherfaces configuration.
Assets: report Figure 2 (one subject), Figure 7 (reconstruction), Figure 10 (eigenfaces), Figure 13 (confusion matrix), Figure 20 (Fisherfaces), Figure 21 (final comparison).

### One-liners
- **AdaIN**: from-scratch arbitrary style transfer, MS-COCO + WikiArt, 2×T4, 150 ms at 512×512 on one T4.
- **Eigenfaces / Fisherfaces**: Olivetti Faces; PCA+SVM 98.0% at 75 components (54× reduction), Fisherfaces 99.0% at 39 dimensions.
- **MPI cluster**: hybrid x86+ARM, PXE/LTSP boot, Ansible, HPCG speedup 7.48/8 (93.5% efficiency).
- **Olympics dashboard**: Streamlit data-visualisation app (`S4afou/olympics-dashboard`).

## Cover and image sources

- **H-GATE cover**: “Rear of rack at NERSC data center - closeup”, Wikimedia Commons, CC0, by Derrick Coetzee. `https://commons.wikimedia.org/wiki/File:Rear_of_rack_at_NERSC_data_center_-_closeup.jpg`
- **NASA cover**: “Space Shuttle Atlantis launches from KSC on STS-132”, Wikimedia Commons, public domain (NASA). `https://commons.wikimedia.org/wiki/File:Space_Shuttle_Atlantis_launches_from_KSC_on_STS-132.jpg`
- **AdaIN cover/gallery**: figures from `E:\All\Studies\AdaIN report.pdf`; the owner is a co-author. Figure 3 is cropped for the 16:9 cover.
- **Eigenfaces cover/gallery**: figures from `E:\All\Studies\Eigenfaces_PCA_Report.pdf`; the owner is a co-author. Figure 2 is placed on a dark 16:9 canvas; the report plate itself is unaltered.
- **Pocket OMR / Spell Caster**: existing project screenshots; no external licence applies. The Spell Caster cover is a 16:9 crop of the gameplay screenshot that shows the recognised spell and emotion.

## Asset gaps
- H-GATE has no project screenshots; the evidence charts were recovered from notebook base64.
- NASA has no project screenshots; the cover is contextual photography and the monitoring chart is generated.
- Pocket OMR’s raw dataset is gone, so nothing can be re-run; use the existing plots.
- AdaIN’s video extension was planned, not delivered; keep the throughput figure labelled “expected”.
