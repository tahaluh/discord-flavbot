import play from "play-dl";
import { createAudioResource, AudioResource } from "@discordjs/voice";

export async function getPlayDLResource(url: string): Promise<AudioResource> {
  try {
    // Fetch the audio stream using play-dl
    const stream = await play.stream(url);

    // Create an AudioResource from the stream
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    return resource;
  } catch (error) {
    console.error("Error generating audio resource:", error);
    throw error;
  }
}
