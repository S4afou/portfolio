# Project facts and claims ledger

Extracted from the notebooks, reports, and code on disk. This is the evidence base for site copy: every number published on the site must appear in this file.

## Claims ledger

| CV claim | Evidence found | Site copy |
| --- | --- | --- |
| NASA: "99% accuracy" | Best logged run `f1_anomaly` **0.9787**; no accuracy logged. `shuttle_ocsvm_99f1.pkl` has no supporting code or run. | "F1 0.979 on the anomaly class" — never accuracy, never 99% |
| H-GATE: ensemble superiority | +0.16 pp accuracy vs vanilla XGBoost (baseline macro-F1 0.9839); macro-AUC is *lower* (0.9984 vs 0.9993) | Lead with macro-F1 0.986 and macro-FPR 0.37%; compare honestly to a strong baseline |
| Spell Caster: "Whisper-LoRA dual ASR+SER" | LoRA is fine-tuned for **emotion only**; transcription uses stock Whisper-Small | "LoRA-tuned emotion head on Whisper-Small; transcription uses the base model" |
| Spell Caster: "latency under 2s" | Only measured figure: Conformer CPU batch-1 — 38.5 ms FP32, 19.3 ms INT8. Whisper path unmeasured. | Use the measured Conformer numbers; do not claim a Whisper latency |
| AdaIN: "150 ms inference" | Report: 15–30 FPS at 256 px on 2×T4 | "15–30 FPS at 256 px (2×T4)" |
| Fisherfaces: "105× compression" | Report: 39 dims, **54×** reduction, 99.0% test accuracy | "99.0% accuracy at 39 dimensions (54× reduction)" |
| Pocket OMR: "near-perfect" character recognition | No numeric metric for the character ensemble anywhere | Omit the number; use YOLOv8m-seg mAP@50 99.5 and bubble F1 98.31 |

## Per-project evidence

### Pocket OMR
Custom-collected dataset (dataset folder no longer on disk). Pipeline: OpenCV sheet normalisation (marker warp to 1240×1754, QR orientation, shadow removal, CLAHE+Otsu) → YOLOv8m-seg 8-class region segmentation → CNN bubble classifier → three-model character ensemble (EfficientNetV2-S, SimpleCNN_SE, MobileNetV3-S) with EMNIST pre-training and soft-voting. Deployed via FastAPI + React + Flutter, Docker, T4.
Numbers: YOLOv8m-seg P 99.8 / R 100.0 / mAP@50 99.5 / mAP@50-95 96.0 (box). Bubble classifier MobileNetV3-S: accuracy 98.98, F1 98.31, ROC-AUC 99.96. A YOLOv8s bubble variant was rejected at 30.2% answer accuracy — a useful "what I rejected" note.
Assets: `Report\Diagrams\*`, `Report\report_plots\*`, `Report\plots\*`, `Report\OMR YOLO bubble detection\*`.

### H-GATE
ISCX-URL2016, 36,707 rows, 5 classes. 5-fold out-of-fold stacking: FT-Transformer + focal-loss LightGBM + XGBoost + CatBoost, logistic meta-learner, SMOTE-NC, per-class thresholds (recall floor 0.90), Harris Hawks hyperparameter search, SHAP. Metrics: accuracy 0.9854, macro-F1 0.9856, macro-FPR 0.0037.
Caveat: metrics are out-of-fold on the full dataset, not an independent test set.
Assets: figures embedded as base64 in the notebook; extract from the `.ipynb` JSON. Otherwise only `HGATE_Presentation.pptx`.

### NASA Shuttle anomaly detection + MLOps
OpenML `shuttle`, 55,941 rows × 9 cols. Scaler + LocalOutlierFactor(novelty=True) fitted on normal rows only; W&B Bayesian sweep over `n_neighbors` and `contamination`; model registry; 5-batch auto-retrain triggered at production F1 < 0.80; Streamlit UI with LOF/iForest/OCSVM switch and live W&B logging. Best sweep F1 0.9787; production F1 fell to 0.4324 under injected synthetic drift and the retrain trigger fired. The drift-and-retrain arc is the strongest part of the story.
Assets: none; charts must be generated from the notebook or described in a diagram.

### Spell Caster
CREMA-D (SER, 6 emotions) + LibriSpeech (ASR). Two models: from-scratch Conformer (5.05M params) with CTC + attention-pooling SER head; Whisper-Small + LoRA (0.73% of params trainable) with a 6-class emotion head. Kendall uncertainty weighting, ONNX INT8 export. FastAPI `/cast_spell` returns spell + emotion, neutral fallback below 0.35 confidence.
Numbers: Whisper-Small+LoRA WER 0.0015, CER 0.0011, emotion accuracy 0.7584, emotion F1 0.7543. Conformer WER 0.1128, emotion accuracy 0.5383. Conformer CPU latency 38.5 ms FP32 → 19.3 ms INT8.
Assets: `E:\All\Studies\Final\Images\` (architecture diagrams, confusion matrices, latency plot, gameplay screenshots, two `.mp4` recordings).

### One-liners
- **AdaIN**: from-scratch arbitrary style transfer, MS-COCO + WikiArt, 2×T4, 15–30 FPS at 256 px.
- **Eigenfaces / Fisherfaces**: Olivetti Faces; PCA+SVM 98.0%, Fisherfaces 99.0% at 39 dims (54× reduction).
- **MPI cluster**: hybrid x86+ARM, PXE/LTSP boot, Ansible, HPCG speedup 7.48/8 (93.5% efficiency).
- **Olympics dashboard**: Streamlit data-visualisation app (`S4afou/olympics-dashboard`).

## Asset gaps
- H-GATE has no standalone images; recover figures from notebook base64 or generate from outputs.
- NASA has no images at all; needs a pipeline diagram and one result chart.
- Pocket OMR's raw dataset is gone, so nothing can be re-run; use the existing plots.
