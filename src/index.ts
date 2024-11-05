import { Client } from "discord.js";
import { deployCommands } from "./commands/deploy-commands";
import { commands } from "./commands";
import { config } from "./config";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  console.log(message.content);
  if (message.content === "ping") {
    message.reply("pong");
  }

  if (message.channel.id === "1300940930336948305") {
    message.react("👍");

    const responses = [
      `Obrigado pela homenagem ${message.author.toString()}!`,
      `Que carinhoso`,
      `Muito obrigado!`,
      `Que lindo!`,
      `Obrigado!`,
      `Que fofo!`,
      `Que legal!`,
      `Você é incrível!`,
      `Fico emocionado!`,
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    message.reply({
      content: responses[randomIndex],
    });
  }
});

client.on("error", (error) => {
  console.error("An error occurred:", error);
});

client.on("warn", (info) => {
  console.warn(info);
});

client.login(config.DISCORD_TOKEN);
