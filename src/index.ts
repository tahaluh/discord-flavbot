import { Client } from "discord.js";
import { deployCommands } from "./commands/deploy-commands";
import { config } from "./config";
import { events } from "./events";

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    "GuildVoiceStates",
    "MessageContent",
    "GuildMessageReactions",
    "GuildMembers",
  ],
});

client.once("ready", events.ready);

// it throws an error when moved to events/guildCreate.ts...
client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", events.interactionCreate);
client.on("voiceStateUpdate", events.voiceStateUpdate);
client.on("messageCreate", events.messageCreate);

client.login(config.DISCORD_TOKEN);
