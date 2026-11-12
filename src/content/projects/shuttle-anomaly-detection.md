---
title: 'Shuttle Telemetry Anomaly Detection with an MLOps Retraining Loop'
shortTitle: Shuttle anomaly detection
summary: A semi-supervised detector for spacecraft telemetry, wrapped in a monitoring and retraining loop that catches its own failure and replaces the model.
ownership: >-
  Solo project. I built the detector, the Weights & Biases sweep and model
  registry, the retraining trigger, and the Streamlit interface.
timeframe: '2025'
stack:
  - Python
  - scikit-learn
  - LocalOutlierFactor
  - Weights & Biases
  - Streamlit
  - Docker

problem: >-
  Telemetry from a spacecraft is overwhelmingly normal. A detector trained only
  on normal behaviour has to catch the rare anomaly without inventing alarms,
  and it has to keep working months later, when the data has drifted away from
  its training set.

research:
  - citation: >-
      Breunig et al. (2000), “LOF: Identifying Density-Based Local Outliers,”
      SIGMOD.
    takeaway: >-
      LOF scores a point by how isolated it is relative to its neighbours,
      which fits telemetry where anomalies are rare and local. Novelty mode
      lets us fit only on normal rows and score new batches without refitting.
  - citation: >-
      Liu et al. (2008), “Isolation Forest,” ICDM.
    takeaway: >-
      Isolation Forest isolates anomalies with random splits and scales better
      than neighbour methods. I exposed it as a runtime alternative, but the
      registered artifact is LOF.
  - citation: >-
      Schölkopf et al. (2001), “Estimating the Support of a High-Dimensional
      Distribution,” Neural Computation.
    takeaway: >-
      OCSVM learns a boundary around normal data. It is sensitive to nu and the
      kernel scale, which is why it is a comparison switch rather than the
      default.
  - citation: >-
      Gama et al. (2014), “A Survey on Concept Drift Adaptation,” ACM Computing
      Surveys.
    takeaway: >-
      Drift is not a single event; it can be gradual, abrupt, or recurring. The
      injected-drift test is an abrupt case, and the retraining loop is the
      part that generalises to the others.
  - citation: >-
      Sculley et al. (2015), “Hidden Technical Debt in Machine Learning
      Systems,” NeurIPS.
    takeaway: >-
      The model is a small part of the system. Monitoring, data dependencies,
      and retraining are where the project's value sits, which is why the
      retraining loop, not the detector, is the headline.

comparison:
  - option: 'Local Outlier Factor, novelty mode'
    strengths: >-
      Fits on normal rows only, captures local density, and produced the best
      sweep F1 of 0.9787.
    limits: >-
      Neighbour-based scoring is sensitive to scaling and to the choice of
      n_neighbors and contamination; it is slower on large batches.
    verdict: >-
      The registered default. It is the model the monitoring loop watches.
  - option: 'Isolation Forest'
    strengths: >-
      Fast, scales well, and needs no distance metric. A useful sanity check
      when the data grows.
    limits: >-
      Less interpretable locally, and the runtime switch has no logged sweep
      result in the ledger.
    verdict: >-
      A comparison switch, not the registered artifact. I would benchmark it
      on the same drift batches before promoting it.
  - option: 'One-Class SVM'
    strengths: >-
      A principled boundary around normal data; works well when the normal
      class is compact.
    limits: >-
      Sensitive to nu and kernel scale, and training is heavier than LOF or
      Isolation Forest on this dataset.
    verdict: >-
      Kept as a third view of the boundary; not the default.
  - option: 'Production-F1 trigger versus input-drift monitoring'
    strengths: >-
      The 0.80 trigger retrains only when production F1 collapses, saving
      compute and making the decision auditable.
    limits: >-
      It reacted after the injected drift had already pushed F1 to 0.4324; a
      leading indicator would catch the drop earlier.
    verdict: >-
      The loop works, but it is reactive. The next step is a drift detector on
      the input distribution, not just a lagging F1 threshold.

approach:
  - >-
    Use the OpenML shuttle dataset: 55,941 telemetry rows, nine columns, with
    the anomaly class a small minority.
  - >-
    Fit a scaler and LocalOutlierFactor in novelty mode on normal rows only,
    then sweep n_neighbors and contamination in a Weights & Biases Bayesian
    search.
  - >-
    Register the best artifact in Weights & Biases and serve it through a
    Streamlit interface, with LocalOutlierFactor, isolation forest, and OCSVM
    switchable at runtime.
  - >-
    Log each batch's F1 against the registered baseline and retrain
    automatically when production F1 drops below 0.80.
  - >-
    Inject synthetic drift on purpose, to prove the monitoring and retraining
    loop fires rather than assuming it would.

contribution:
  - >-
    I built the LOF novelty detector, the scaler, and the batch-scoring path.
  - >-
    I ran the Weights & Biases Bayesian sweep over n_neighbors and
    contamination, registered the best artifact, and wired the model registry
    into the Streamlit app.
  - >-
    I built the production-F1 logger, the 0.80 retrain trigger, and the
    injected-drift test that forced the loop to fire.
  - >-
    I added the LOF / Isolation Forest / OCSVM switch so the detector could be
    compared at runtime.

results:
  - name: Anomaly F1
    value: '0.979'
    context: Best sweep, registered artifact
  - name: Production F1
    value: '0.432'
    context: After injected drift
  - name: Retrain threshold
    value: '0.80'
    context: Production F1 that triggers a new run

reflection: >-
  The detector was the easy part. The value is that the F1 collapse showed up in
  monitoring, the retrain trigger fired, and the project ends with a new
  artifact instead of a silent failure. I would add a real time-based split
  next; injecting drift proves the plumbing, not robustness to real spacecraft
  telemetry. The retrain trigger is also a lagging indicator, so input-drift
  monitoring is the next thing I would build.

cover:
  src: /projects/nasa/cover.webp
  alt: The forward flight deck of Space Shuttle Atlantis, with glowing blue control-panel displays and switches.
  caption: The forward flight deck of Atlantis on STS-132. The detector runs on shuttle telemetry, not on the cockpit. Photograph by NASA, public domain.

gallery:
  - src: /projects/nasa/monitoring.webp
    alt: Bar chart comparing the registered baseline F1 with production F1 after injected drift, against a retraining threshold of 0.80.
    caption: Production F1 against the registered baseline. The retraining trigger is the dashed line.

repos:
  - label: Detector repository
    url: https://github.com/S4afou/shuttle-nasa-ML
    status: published
  - label: MLOps pipeline
    url: https://github.com/S4afou/shuttle-nasa-mlops
    status: published

featured: true
order: 4
---
