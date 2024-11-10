import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { audioQueueManager } from "../player/audioQueueManager";

const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Pula o áudio atual");

async function execute(interaction: CommandInteraction) {
  audioQueueManager.getQueue(interaction.guildId!).skip();
  return interaction.reply("Pulando o áudio atual...");
}

export const skip = { data, execute };
