import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "./deploy-commands";

const data = new SlashCommandBuilder().setName("pong").setDescription("...");

async function execute(interaction: CommandInteraction) {
  return interaction.reply("É ping, não pong!");
}

export const pong = { data, execute };
