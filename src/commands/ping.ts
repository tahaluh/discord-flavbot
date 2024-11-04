import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction: CommandInteraction) {
  return interaction.reply("Pong!");
}

export const ping = { data, execute };
