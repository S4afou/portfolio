---
title: Shuttle Anomaly Detection
summary: A semi-supervised detector for spacecraft telemetry, wrapped in a monitoring and retraining loop that catches its own failure and replaces the model.
ownership: 'Solo project. I built the detector, the Weights & Biases sweep and model registry, the retraining trigger, and the Streamlit interface.'
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
  telemetry.

cover:
  src: /projects/nasa/cover.webp
  alt: Space Shuttle Atlantis lifting off from Kennedy Space Center on the STS-132 mission.
  caption: Atlantis on STS-132. The detector runs on shuttle telemetry, not on launch imagery. Photograph by NASA, public domain.

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
