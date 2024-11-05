import { Guild, VoiceChannel, Collection } from "discord.js";

export function getActiveVoiceChannels(
  guild: Guild
): Collection<string, VoiceChannel> {
  return guild.channels.cache.filter(
    (channel): channel is VoiceChannel =>
      channel.isVoiceBased() && channel.members.size > 0
  );
}
