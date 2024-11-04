import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deployCommands } from "./deploy-commands";

const data = new SlashCommandBuilder()
  .setName("refresh")
  .setDescription("Atualiza os comandos do bot.");

async function execute(interaction: CommandInteraction) {
  await deployCommands({ guildId: interaction.guildId! });
  return interaction.reply("Comandos atualizados!");
}

export const refresh = { data, execute };
