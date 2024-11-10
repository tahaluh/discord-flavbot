import { createAudioResource } from "@discordjs/voice";
import { VoiceChannel, VoiceBasedChannel } from "discord.js";
import { audioQueueManager } from "../player/audioQueueManager";

export async function playSoundInChannel(
  channel: VoiceChannel | VoiceBasedChannel,
  audioPath: string
): Promise<void> {
  try {
    const resource = createAudioResource(audioPath);

    audioQueueManager.getQueue(channel.guild.id).addToQueue(resource, channel);
  } catch (error) {
    console.error("Erro ao tentar conectar e reproduzir áudio:", error);
  }
}
