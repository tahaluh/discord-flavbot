import { Interaction } from "discord.js";
import { commands } from "../commands";

export const handleInteractionCreate = async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  if (commands[commandName as keyof typeof commands]) {
    await commands[commandName as keyof typeof commands].execute(interaction);
  }
};
