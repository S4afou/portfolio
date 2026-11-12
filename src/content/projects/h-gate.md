---
title: 'H-GATE: Harris-Hawks-Optimized Gradient-boosted Attention-Transformer Ensemble'
shortTitle: H-GATE
summary: A five-class malicious-URL classifier built as a stacking ensemble, evaluated out-of-fold and compared honestly against a strong XGBoost baseline.
ownership: >-
  Solo project. I built the four base learners, the out-of-fold stacking
  pipeline, the Harris Hawks hyperparameter search, and the five-fold
  evaluation.
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
  little. Security teams need five-way labelling: benign, defacement, malware,
  phishing, and spam, with a false-positive rate low enough that analysts keep
  trusting the alerts.

research:
  - citation: >-
      Heidari et al. (2019), “Harris Hawks Optimization: Algorithm and
      Applications,” Future Generation Computer Systems.
    takeaway: >-
      HHO is a gradient-free, population-based optimiser. I used it for the
      mixed integer and continuous search space around the tree models, where a
      full grid search would have been too expensive. Its stochasticity is why
      the final comparison rests on fixed folds, not on the best single run.
  - citation: >-
      Gorishniy et al. (2021), “Revisiting Deep Learning Models for Tabular
      Data,” NeurIPS.
    takeaway: >-
      The FT-Transformer tokenises each feature and applies self-attention. It
      gave the ensemble a non-tree learner that could model feature
      interactions the boosted trees miss. It was also the most expensive
      branch to train, which is why it is one of four models rather than the
      whole classifier.
  - citation: >-
      Chen & Guestrin (2016), “XGBoost: A Scalable Tree Boosting System,” KDD;
      Ke et al. (2017), “LightGBM: A Highly Efficient Gradient Boosting
      Decision Tree,” NeurIPS; Prokhorenkova et al. (2018), “CatBoost: Unbiased
      Boosting with Categorical Features,” NeurIPS.
    takeaway: >-
      The three boosted-tree libraries are the strong tabular baselines.
      XGBoost is the reference, LightGBM handled the focal-loss objective
      cleanly, and CatBoost’s ordered boosting helped with the lexical
      features. The ensemble only earns its complexity if it beats the best
      single tree model.
  - citation: >-
      Lin et al. (2017), “Focal Loss for Dense Object Detection,” ICCV.
    takeaway: >-
      Focal loss down-weights easy examples so the LightGBM branch can focus on
      the rare malicious classes without discarding the majority class. It was
      paired with per-class thresholds, because a loss change alone does not
      choose the operating point.
  - citation: >-
      Chawla et al. (2002), “SMOTE: Synthetic Minority Over-sampling
      Technique,” JAIR.
    takeaway: >-
      SMOTE-NC extends SMOTE to mixed numeric and categorical features. I ran
      it inside each training fold so synthetic rows never crossed the fold
      boundary; that detail matters more than the oversampling ratio.
  - citation: >-
      Lundberg & Lee (2017), “A Unified Approach to Interpreting Model
      Predictions,” NeurIPS.
    takeaway: >-
      SHAP gave per-class feature attributions for the final ensemble. It is
      the difference between a leaderboard number and a model an analyst can
      question.

comparison:
  - option: 'Vanilla XGBoost'
    strengths: >-
      Strong tabular baseline, fast to tune, well understood, and already
      reaches 0.9839 macro-F1 on the same folds.
    limits: >-
      One model family. It cannot exploit the complementary errors of a
      transformer or a differently regularised tree model.
    verdict: >-
      Kept as the reference. The ensemble has to beat this, not a weak
      baseline.
  - option: 'Four-model stacking with a logistic meta-learner'
    strengths: >-
      Combines FT-Transformer, focal-loss LightGBM, XGBoost, and CatBoost;
      reaches 0.9856 macro-F1 and 0.37% macro-FPR out-of-fold.
    limits: >-
      Macro-AUC is lower than vanilla XGBoost (0.9984 against 0.9993), the F1
      gain is 0.17 percentage points, and out-of-fold numbers on the same
      dataset flatter every model.
    verdict: >-
      A narrow, honest win on F1 and false positives, not a decisive one. I
      would not present it as a new state of the art.
  - option: 'HHO versus grid or random search'
    strengths: >-
      HHO searches a mixed hyperparameter space without gradients and can
      explore configurations that a small grid would not reach.
    limits: >-
      Stochastic and expensive. A single search run is not evidence, and the
      budget was small relative to the number of models.
    verdict: >-
      Part of the method, not the evidence. The claim rests on the fixed-fold
      comparison with vanilla XGBoost.

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
    Evaluate with five-fold out-of-fold predictions on the full dataset, not
    an independent test set, a distinction the numbers depend on.

contribution:
  - >-
    I built the FT-Transformer branch, the focal-loss LightGBM branch, and the
    XGBoost and CatBoost baselines, then wired them into a five-fold
    out-of-fold stack.
  - >-
    I implemented the SMOTE-NC step inside each training fold, the per-class
    threshold search against a 0.90 recall floor, and the logistic
    meta-learner.
  - >-
    I ran the Harris Hawks search, the SHAP analysis, and the comparison
    against vanilla XGBoost; the macro-AUC caveat in the reflection comes from
    that comparison.

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
  - name: Macro-AUC
    value: '0.9984'
    context: Stacking ensemble; vanilla XGBoost scored 0.9993

reflection: >-
  The ensemble's macro-F1 was 0.17 percentage points above a strong vanilla
  XGBoost baseline, while its macro-AUC was lower (0.9984 against 0.9993). That
  is not a decisive win, and I would not present it as one. I would add a
  time-based held-out set next, because out-of-fold numbers on the same dataset
  flatter every model in the comparison.

cover:
  src: /projects/h-gate/cover.webp
  alt: A laptop screen showing a red “Malicious file” warning over a blue Windows desktop.
  caption: A malicious-file warning on a Windows desktop. The classifier works on URLs, not on this screen. Photograph by Ed Hardie, Unsplash License.

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
