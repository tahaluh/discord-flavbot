import { createAudioResource, AudioResource } from "@discordjs/voice";
import googleTTS, { getAudioUrl } from "google-tts-api";

export async function getTTSResource(
  message: string,
  language = "en",
  slow = false
): Promise<AudioResource> {
  // Generate TTS audio URL
  const url = getAudioUrl(message, {
    lang: language,
    slow: slow,
    host: "https://translate.google.com",
  });

  // Create and return the audio resource
  return createAudioResource(url);
}
