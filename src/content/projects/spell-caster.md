---
title: 'Spell Caster: Voice-Driven RPG with Emotion-Aware Spell Casting'
shortTitle: Spell Caster
summary: A voice-controlled spellcasting prototype that hears the spell and the emotion behind it, then hands both to the game.
ownership: >-
  Two-person project. I built the ASR and emotion pipeline and the local
  FastAPI server; the Unity game was my teammate's work, and we integrated the
  pipeline together.
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

research:
  - citation: >-
      Radford et al. (2023), “Robust Speech Recognition via Large-Scale Weak
      Supervision,” ICML.
    takeaway: >-
      Whisper's weak supervision gave us a transcription model that handled
      short, noisy game commands without a domain-specific corpus. We kept the
      base model frozen and adapted only the emotion head, because full
      fine-tuning would have given up the data and latency advantages.
  - citation: >-
      Gulati et al. (2020), “Conformer: Convolution-augmented Transformer for
      Speech Recognition,” Interspeech.
    takeaway: >-
      The Conformer's convolution blocks capture local acoustic detail while
      attention models longer context. We built a 5.05M-parameter version from
      scratch as the CPU-friendly comparison; it was small enough to export,
      but not accurate enough to replace Whisper.
  - citation: >-
      Hu et al. (2021), “LoRA: Low-Rank Adaptation of Large Language Models,”
      ICLR.
    takeaway: >-
      LoRA let us train 0.73% of Whisper-Small's parameters for the six-class
      emotion head. The important detail is that the transcription weights
      stayed stock; only the emotion adapter was fine-tuned.
  - citation: >-
      Cao et al. (2014), “CREMA-D: Crowd-sourced Emotional Multimodal Actors
      Dataset,” IEEE Transactions on Affective Computing.
    takeaway: >-
      CREMA-D gave us six acted emotions with controlled variation in speaker,
      sentence, and intensity. It is cleaner than in-game speech, so the
      0.7543 F1 is an upper bound on what the game would see.
  - citation: >-
      Kendall et al. (2018), “Multi-Task Learning Using Uncertainty to Weigh
      Losses for Scene Geometry and Semantics,” CVPR.
    takeaway: >-
      Kendall weighting let the ASR and SER heads contribute to one loss
      without hand-tuning a fixed ratio. It is a principled alternative to a
      grid search over loss weights.

comparison:
  - option: 'Whisper-Small with a LoRA-tuned emotion head'
    strengths: >-
      WER 0.0015 and emotion F1 0.7543 on the evaluation. The base model is
      robust to short, noisy commands, and only 0.73% of its parameters are
      trainable.
    limits: >-
      The full Whisper path is heavier on CPU, and the report measured only the
      Conformer's latency, not Whisper's.
    verdict: >-
      The quality reference and the model I would start from. The missing
      Whisper latency measurement is the main gap.
  - option: 'From-scratch Conformer (5.05M parameters)'
    strengths: >-
      WER 0.1128, emotion F1 0.5253, and 19.3 ms for a batch-1 CPU forward pass
      after ONNX INT8 export.
    limits: >-
      Much worse transcription and emotion quality than Whisper. Training from
      scratch on this data budget did not close the gap.
    verdict: >-
      The CPU-friendly comparison, not the better model. Its latency is real,
      but it is not worth the accuracy loss for the game.

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

contribution:
  - >-
    I built the audio pipeline: Whisper-Small with a LoRA-tuned six-class
    emotion head, and the from-scratch Conformer with CTC and an
    attention-pooling SER head.
  - >-
    I combined the objectives with Kendall uncertainty weighting, exported the
    Conformer to ONNX INT8, and served spell and emotion from one FastAPI
    endpoint with a neutral fallback below 0.35 confidence.
  - >-
    I integrated the endpoint with my teammate's Unity client. The game
    mechanics and the C# client were my teammate's work.

results:
  - name: Emotion F1
    value: '0.754'
    context: Whisper-Small with a LoRA-tuned emotion head
  - name: WER (Whisper)
    value: '0.0015'
    context: Whisper-Small, stock transcription weights
  - name: WER (Conformer)
    value: '0.113'
    context: From-scratch Conformer, LibriSpeech
  - name: CPU latency
    value: '19.3 ms'
    context: Conformer, batch size one, ONNX INT8

reflection: >-
  The Conformer was the more interesting model to build and the worse one to
  ship: its WER was 0.113 against Whisper's 0.0015, and its only advantage was
  running comfortably on CPU. I would start from the strongest base model and
  spend the effort on the task-specific head, then measure latency on the path
  users actually take rather than on a benchmark in isolation. The report never
  measured the Whisper path on CPU, so the latency comparison is incomplete.

cover:
  src: /projects/spell-caster/cover.webp
  alt: An ice spell effect in the Unity game, with snowflakes, a castle, and the player's gauntlet visible.
  caption: Fear maps to ice. The microphone indicator shows the client is listening; the spell and emotion come from one API response.

gallery:
  - src: /projects/spell-caster/architecture.webp
    alt: Architecture of the Spell Caster pipeline, from the Unity client through FastAPI to Whisper and the Conformer.
    caption: A single endpoint receives audio, transcribes it, classifies emotion, and maps the pair to a spell.
  - src: /projects/spell-caster/fire-cast.webp
    alt: A fireball spell effect in the Unity game, with an on-screen readout showing the heard word, emotion, and confidence.
    caption: The fireball path. The client prints the recognised spell, emotion, and confidence beside the effect.
  - src: /projects/spell-caster/confusion-matrix.webp
    alt: Confusion matrix for the six emotion classes predicted by the Whisper-Small emotion head.
    caption: Emotion confusion, six classes. Neutral is the easiest to confuse with everything else.
  - src: /projects/spell-caster/latency.webp
    alt: Bar chart of Conformer inference latency on CPU at batch size one after INT8 export, 19.3 ms.
    caption: Conformer on CPU at batch size one after INT8 export. The Whisper transcription path was not benchmarked.

repos:
  - label: GitHub repository
    status: pending

featured: true
order: 2
---
