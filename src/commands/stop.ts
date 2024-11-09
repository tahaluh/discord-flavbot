import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { audioQueue } from "../player/audioQueue";

const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Para a reprodução e limpa a fila de áudio");

async function execute(interaction: CommandInteraction) {
  audioQueue.clearQueue();
  return interaction.reply(
    "Parando a reprodução e limpando a fila de áudio..."
  );
}

export const stop = { data, execute };
