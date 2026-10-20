// Reads German aloud with the device's own voices (Web Speech API). See ADR 0006.
//
// Every listen button in the book goes through speak(), so the Capacitor app can
// replace this one function with a native text-to-speech plugin (Android's WebView
// has no reliable speechSynthesis).

export type SpeakResult = "spoken" | "no-german-voice" | "unsupported";

interface VoiceLike {
  lang: string;
  localService?: boolean;
}

/** Pick the best German voice: Germany first, then any German, preferring on-device. */
export function pickGermanVoice<V extends VoiceLike>(voices: readonly V[]): V | undefined {
  const german = voices.filter((voice) => voice.lang.toLowerCase().replace("_", "-").startsWith("de"));
  const fromGermany = german.filter((voice) => voice.lang.toLowerCase().replace("_", "-") === "de-de");
  const candidates = fromGermany.length > 0 ? fromGermany : german;
  return candidates.find((voice) => voice.localService) ?? candidates[0];
}

export function speak(text: string): SpeakResult {
  if (!("speechSynthesis" in window)) return "unsupported";

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9; // a touch slower than conversation, for learners

  // Chrome loads voices asynchronously: an empty list means "not loaded yet", not
  // "no German voice". Then lang="de-DE" lets the browser choose.
  const voices = window.speechSynthesis.getVoices();
  const voice = pickGermanVoice(voices);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.cancel(); // a new tap interrupts the previous line
  window.speechSynthesis.speak(utterance);

  if (voices.length > 0 && !voice) return "no-german-voice";
  return "spoken";
}
