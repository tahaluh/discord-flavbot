import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { getUserVoiceChannel } from "../utils/getUserVoiceChannel";
import { getPlayDLResource } from "../utils/getPlayDLResource";
import { playSoundInChannel } from "../utils/playSoundInChannel";

const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Toca o som de uma url")
  .addStringOption((option) =>
    option.setName("url").setDescription("A url do som").setRequired(true)
  );

async function execute(interaction: CommandInteraction) {
  const url = interaction.options.get("url")!.value as string;

  if (!url) {
    return interaction.reply("Url inválida");
  }

  const voiceChannel = getUserVoiceChannel(
    interaction.guild!,
    interaction.member!.user.id
  );

  if (!voiceChannel) {
    return interaction.reply("Você precisa estar em um canal de voz");
  }

  console.log(`Playing sound in channel ${voiceChannel.id}`);
  console.log(`URL: ${url}`);

  const resource = await getPlayDLResource(url);

  await playSoundInChannel(voiceChannel, resource);

  interaction.reply("Toca o som dj! 🎵");
}

export const play = { data, execute };
