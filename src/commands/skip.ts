import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { audioQueue } from "../player/audioQueue";

const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Pula o áudio atual");

async function execute(interaction: CommandInteraction) {
  audioQueue.skip();
  return interaction.reply("Pulando o áudio atual...");
}

export const skip = { data, execute };
