import { VoiceChannel, Collection } from "discord.js";
import { getActiveVoiceChannels } from "./getActiveVoiceChannels";

export async function moveAllMembersToChannel(
  targetChannel: VoiceChannel
): Promise<string> {
  const channels = await getActiveVoiceChannels(targetChannel.guild);
  for (const channel of channels.values()) {
    if (channel.id !== targetChannel.id) {
      for (const [memberId, member] of channel.members) {
        try {
          console.log(
            `Movendo ${member.user.tag} para a call ${targetChannel.name}`
          );
          await member.voice.setChannel(targetChannel);
        } catch (error) {
          console.error(`Erro ao mover ${member.user.tag}:`, error);
          return `Erro ao mover ${member.user.tag}.`;
        }
      }
    }
  }
  return `Todos foram movidos para a call: ${targetChannel.name}`;
}
