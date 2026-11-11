---
title: H-GATE
summary: A five-class malicious-URL classifier built as a stacking ensemble, evaluated out-of-fold and compared honestly against a strong XGBoost baseline.
ownership: 'Solo project. I designed the stacking pipeline, ran the Harris Hawks hyperparameter search, and evaluated all five folds.'
timeframe: '2025'
stack:
  - Python
  - PyTorch
  - FT-Transformer
  - XGBoost
  - LightGBM
  - CatBoost
  - SHAP
  - scikit-learn

problem: >-
  A URL classifier that flags too much is as useless as one that flags too
  little. Security teams need five-way labelling — benign, defacement, malware,
  phishing, spam — with a false-positive rate low enough that analysts keep
  trusting the alerts.

approach:
  - >-
    Start from ISCX-URL2016: 36,707 URLs across five classes, with a severe
    class imbalance.
  - >-
    Train four base models: an FT-Transformer, a focal-loss LightGBM, XGBoost,
    and CatBoost.
  - >-
    Feed their out-of-fold predictions to a logistic meta-learner, with
    SMOTE-NC and per-class thresholds tuned to a recall floor of 0.90.
  - >-
    Search hyperparameters with Harris Hawks optimisation and explain the
    result with SHAP.
  - >-
    Evaluate with five-fold out-of-fold predictions on the full dataset — not
    an independent test set, a distinction the numbers depend on.

results:
  - name: Macro-F1
    value: '0.9856'
    context: Stacking ensemble, five-fold out-of-fold
  - name: Macro-FPR
    value: '0.37%'
    context: False positives averaged across classes
  - name: Baseline macro-F1
    value: '0.9839'
    context: Vanilla XGBoost on the same folds

reflection: >-
  The ensemble's accuracy was 0.16 percentage points above a strong vanilla
  XGBoost baseline, while its macro-AUC was lower (0.9984 against 0.9993). That
  is not a decisive win, and I would not present it as one. I would add a
  time-based held-out set next, because out-of-fold numbers on the same dataset
  flatter every model in the comparison.

cover:
  src: /projects/h-gate/cover.webp
  alt: Rear view of a server rack at the NERSC data center, with network and management cables connected to stacked machines.
  caption: A data-center rack at NERSC. Photograph by Derrick Coetzee, CC0.

gallery:
  - src: /projects/h-gate/confusion-matrix.webp
    alt: Confusion matrix across the five URL classes.
    caption: Per-class confusion on the out-of-fold predictions.
  - src: /projects/h-gate/roc.webp
    alt: ROC curves for each of the five URL classes.
    caption: One-vs-rest ROC curves. The macro-AUC sits slightly below the XGBoost baseline.
  - src: /projects/h-gate/class-distribution.webp
    alt: Bar chart showing the class distribution of ISCX-URL2016.
    caption: The imbalance that motivated focal loss, SMOTE-NC, and per-class thresholds.

repos:
  - label: GitHub repository
    status: pending

featured: true
order: 3
---
