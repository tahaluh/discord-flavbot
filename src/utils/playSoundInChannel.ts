import {
  joinVoiceChannel,
  createAudioPlayer,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  DiscordGatewayAdapterCreator,
  AudioResource,
} from "@discordjs/voice";
import { PermissionsBitField, VoiceChannel } from "discord.js";

export async function playSoundInChannel(
  channel: VoiceChannel,
  resource: AudioResource
): Promise<void> {
  // Check if the bot has Priority Speaker permission
  const botMember = await channel.guild.members.fetchMe();
  const botPermissions = channel.permissionsFor(botMember);

  if (!botPermissions?.has(PermissionsBitField.Flags.PrioritySpeaker)) {
    console.log(
      "The bot does not have Priority Speaker permission. There may be issues joining full channels."
    );
  }

  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild
        .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    // Wait for connection to be ready
    connection.on(VoiceConnectionStatus.Ready, async () => {
      // console.log("Connected to the voice channel!");

      // Play sound
      const player = createAudioPlayer();
      // const resource = createAudioResource(getAudioPath("lula-tira.mp3"));
      // const resource = await getTTSResource("Hello, world!", "en", false);
      player.play(resource);
      connection.subscribe(player);

      // Listen for playback start and end events
      player.on(AudioPlayerStatus.Playing, () => {
        // console.log("Audio is now playing!");
      });

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("Audio playback has finished.");
        connection.destroy(); // Disconnect after playback ends
      });
    });

    // Handle connection errors
    connection.on("error", (error) => {
      console.error("Connection error:", error);
      connection.destroy();
    });
  } catch (error) {
    console.error("Error while attempting to connect and play audio:", error);
  }
}
