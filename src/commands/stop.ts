import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { audioQueueManager } from "../player/audioQueueManager";

const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Para a reprodução e limpa a fila de áudio");

async function execute(interaction: CommandInteraction) {
  audioQueueManager.getQueue(interaction.guildId!).clearQueue();
  return interaction.reply(
    "Parando a reprodução e limpando a fila de áudio..."
  );
}

export const stop = { data, execute };
