import { createAudioResource, AudioResource } from "@discordjs/voice";
import { getAudioUrl } from "google-tts-api";
import fs from "fs/promises";

export async function getTTSResource(
  message: string,
  language = "en",
  slow = false
): Promise<AudioResource> {
  const url = getAudioUrl(message, {
    lang: language,
    slow: slow,
    host: "https://translate.google.com",
  });

  const fileName = `tts-audio-${Date.now()}.mp3`;

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(fileName, Buffer.from(arrayBuffer));

  const audioResource = createAudioResource(fileName);

  audioResource.playStream.on("end", async () => {
    await fs.unlink(fileName);
  });

  return audioResource;
}
