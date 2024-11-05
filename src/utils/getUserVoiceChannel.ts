import { Guild, VoiceChannel, StageChannel } from "discord.js";

export function getUserVoiceChannel(
  guild: Guild,
  userId: string
): VoiceChannel | null {
  const voiceChannel = guild.channels.cache.find(
    (channel) =>
      (channel instanceof VoiceChannel || channel instanceof StageChannel) &&
      channel.members.has(userId)
  );

  if (!voiceChannel) {
    return null;
  }

  return voiceChannel as VoiceChannel;
}
