import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getChannelWithMostMembers } from "../utils/getChannelWithMostMembers";
import { playSoundInChannel } from "../utils/playSoundInChannel";
import { moveAllMembersToChannel } from "../utils/moveAllMembersToChannel";
import { getTTSResource } from "../utils/getTTSResource";

const data = new SlashCommandBuilder()
  .setName("jumpscare")
  .setDescription("Move todo mundo para a mesma call e toca um som assustador");

async function execute(interaction: CommandInteraction) {
  console.log("Jumpscare command called");

  const targetChannel = await getChannelWithMostMembers(interaction.guild!);

  if (!targetChannel) {
    return interaction.editReply("Não encontrei nenhuma call ativa");
  }

  await interaction.reply("Seu desejo é uma ordem! 👻");

  await moveAllMembersToChannel(targetChannel);

  const resource = await getTTSResource("boo", "pt-BR", false);

  await playSoundInChannel(targetChannel, resource);

  await interaction.followUp("Boo! 👻");
}

export const jumpscare = { data, execute };
