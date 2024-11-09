import {
  joinVoiceChannel,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  AudioResource,
} from "@discordjs/voice";
import { VoiceChannel, VoiceBasedChannel } from "discord.js";
import { audioQueue, QueueItemTypes } from "../player/audioQueue";

export async function playSoundInChannel(
  channel: VoiceChannel | VoiceBasedChannel,
  audioPath: string
): Promise<void> {
  try {
    const resource = createAudioResource(audioPath);

    audioQueue.addToQueue(resource, channel);
  } catch (error) {
    console.error("Erro ao tentar conectar e reproduzir áudio:", error);
  }
}
