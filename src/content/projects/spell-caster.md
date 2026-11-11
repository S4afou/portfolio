---
title: Spell Caster
summary: A voice-controlled spellcasting prototype that hears the spell and the emotion behind it, then hands both to the game.
ownership: 'Two-person project. I built the ASR and emotion pipeline and the local FastAPI server; the Unity game was my teammate''s work, and we integrated the pipeline together.'
timeframe: '2025'
stack:
  - Python
  - PyTorch
  - Whisper-Small
  - LoRA
  - Conformer
  - ONNX
  - FastAPI
  - Unity

problem: >-
  Voice control in a game is usually a menu shortcut. We wanted the spell and
  the emotion behind it to matter, which means transcribing a short, noisy
  utterance and classifying the speaker's affect at the same time, on a laptop
  CPU.

approach:
  - >-
    Transcribe with Whisper-Small as the base model. LoRA is fine-tuned for the
    six-class emotion head only; the transcription weights are the stock ones.
  - >-
    Train a second, smaller Conformer (5.05M parameters) from scratch with CTC
    and an attention-pooling SER head, as a CPU-friendly comparison.
  - >-
    Combine the two objectives with Kendall uncertainty weighting, then export
    the Conformer to ONNX INT8.
  - >-
    Return spell and emotion from a single FastAPI endpoint, falling back to
    neutral below 0.35 confidence.
  - >-
    Integrate that endpoint into the Unity game with my teammate, who built the
    game mechanics and the C# client.

results:
  - name: Emotion F1
    value: '0.754'
    context: Whisper-Small with a LoRA-tuned emotion head
  - name: WER
    value: '0.113'
    context: From-scratch Conformer, LibriSpeech
  - name: CPU latency
    value: '19.3 ms'
    context: Conformer, batch size one, ONNX INT8

reflection: >-
  The Conformer was the more interesting model to build and the worse one to
  ship: its WER was 0.113 against Whisper's 0.0015, and it only won on CPU
  latency. I would start from the strongest base model and spend the effort on
  the task-specific head, then measure latency on the path users actually take
  rather than on a benchmark in isolation.

cover:
  src: /projects/spell-caster/cover.webp
  alt: A fireball spell cast in the Unity game, triggered by the player's voice.
  caption: The Unity client records a short utterance and plays the spell the API returns.

gallery:
  - src: /projects/spell-caster/architecture.webp
    alt: Architecture of the Spell Caster pipeline, from the Unity client through FastAPI to Whisper and the Conformer.
    caption: A single endpoint receives audio, transcribes it, classifies emotion, and maps the pair to a spell.
  - src: /projects/spell-caster/ice-cast.webp
    alt: An ice spell effect in the Unity game after the pipeline recognised the utterance.
    caption: The emotion score shifts the visual response, not just the spell choice.
  - src: /projects/spell-caster/confusion-matrix.webp
    alt: Confusion matrix for the six emotion classes predicted by the Whisper-Small emotion head.
    caption: Emotion confusion, six classes. Neutral is the easiest to confuse with everything else.
  - src: /projects/spell-caster/latency.webp
    alt: Latency breakdown chart for the speech pipeline.
    caption: The measured Conformer path on CPU, before and after INT8 export.

repos:
  - label: GitHub repository
    status: pending

featured: true
order: 2
---
