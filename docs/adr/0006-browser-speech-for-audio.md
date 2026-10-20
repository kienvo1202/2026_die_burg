# 0006 — Audio via the device's own speech synthesis; paid text-to-speech parked

**Status:** Accepted
**Date:** 2026-10-17

## Context

Learners need to hear every German line and word. Options: record a speaker (costly,
slow to change), generate audio files with a paid text-to-speech service (good quality,
costs money per character, files to host and bundle), or use the speech synthesis built
into the reader's device (free, no files, quality varies by device).

Browsers expose device voices through the Web Speech API (`speechSynthesis`). Desktop
Chrome, Edge, Safari and iOS have good German voices. Android's WebView, which the
Capacitor app will use, does not support it reliably.

## Decision

**All audio goes through one function, `speak(text)` in `src/lib/speech.ts`.** On the
web it uses `speechSynthesis` with a `de-DE` voice. If no German voice exists, the page
says so once, in plain words; the text still works. In the Capacitor app (Phase 2),
`speak()` switches to a native text-to-speech plugin.

German text is marked `lang="de"` everywhere, so screen readers and voices pronounce it
as German.

## Alternatives rejected

- **Paid text-to-speech, pre-generated per lesson.** Better and consistent quality, but
  costs money and needs an explicit yes (CLAUDE.md). Parked, not rejected.
- **Recorded native speakers.** Best quality, but every lesson edit means re-recording.

## Consequences

- Free, and instant for every new lesson.
- Voice quality depends on the reader's device; some will hear a robotic voice.
- Pronunciation teaching cannot rely on one exact recording (for example a specific
  regional accent).

## Revisit if

Readers report missing or poor German voices on common devices, or a lesson needs
regional accents. Then cost out paid text-to-speech and ask Kien.
