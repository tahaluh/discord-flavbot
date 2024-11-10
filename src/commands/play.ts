import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getUserVoiceChannel } from "../utils/getUserVoiceChannel";
import { getPlayDLResource } from "../utils/getPlayDLResource";
import { QueueItemTypes } from "../player/audioQueue";
import { audioQueueManager } from "../player/audioQueueManager";

const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Toca o som de uma URL")
  .addStringOption((option) =>
    option.setName("url").setDescription("A URL do som").setRequired(true)
  );

async function execute(interaction: CommandInteraction) {
  const url = interaction.options.get("url")!.value as string;

  if (!url) {
    return interaction.reply("URL inválida.");
  }

  const voiceChannel = getUserVoiceChannel(
    interaction.guild!,
    interaction.member!.user.id
  );

  if (!voiceChannel) {
    return interaction.reply("Você precisa estar em um canal de voz.");
  }

  try {
    const resource = await getPlayDLResource(url);

    await audioQueueManager
      .getQueue(interaction.guildId!)
      .addToQueue(resource, voiceChannel, QueueItemTypes.PLAY);

    interaction.reply("Adicionado à fila! 🎵");
  } catch (error) {
    console.error("Erro ao tentar reproduzir o som:", error);
    interaction.reply("Ocorreu um erro ao tentar reproduzir o som.");
  }
}

export const play = { data, execute };
