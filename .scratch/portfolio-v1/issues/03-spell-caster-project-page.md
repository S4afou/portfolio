# 03: Spell Caster Project page

**What to build:** The second complete Project page, on the same content model and template as Pocket OMR. It tells the voice-controlled game story with honest attribution and measured numbers, and carries its own gameplay screenshots, architecture diagram, confusion matrix and latency chart.

**Blocked by:** 02 — Project content model and the Pocket OMR page

**Status:** done

- [x] The Spell Caster page is reachable at its own URL and uses the shared template
- [x] Ownership says the owner built the ASR and emotion pipeline and the local server, that the Unity game was built by a teammate, and that integration was shared
- [x] Copy states the LoRA tuning improved emotion recognition while transcription uses the base Whisper-Small weights
- [x] The only latency shown is the measured Conformer figure — 19.3 ms on CPU at batch size one after INT8 export
- [x] Results show emotion F1 0.754 and Conformer WER 0.113
- [x] Gallery images resolve, carry alt text and captions
- [x] The unpublished Repository renders as a publishing badge with no anchor
