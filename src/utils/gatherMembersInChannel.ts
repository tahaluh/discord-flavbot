import { Guild } from "discord.js";
import { getActiveVoiceChannels } from "./getActiveVoiceChannels";
import { getChannelWithMostMembers } from "./getChannelWithMostMembers";
import { moveAllMembersToChannel } from "./moveAllMembersToChannel";

export async function gatherMembersInMostActiveChannel(
  guild: Guild
): Promise<string> {
  const maxPeopleChannel = getChannelWithMostMembers(guild);
  if (!maxPeopleChannel) {
    return "Nenhum canal ativo encontrado.";
  }

  return await moveAllMembersToChannel(maxPeopleChannel);
}
