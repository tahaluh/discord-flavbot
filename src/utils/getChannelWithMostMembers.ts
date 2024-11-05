import { VoiceChannel, Guild } from "discord.js";
import { getActiveVoiceChannels } from "./getActiveVoiceChannels";

export function getChannelWithMostMembers(guild: Guild): VoiceChannel | null {
  const voiceChannels = getActiveVoiceChannels(guild);

  return voiceChannels.reduce((maxChannel, channel) =>
    channel.members.size > maxChannel!.members.size ? channel : maxChannel
  );
}
