import {
  joinVoiceChannel,
  createAudioPlayer,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  DiscordGatewayAdapterCreator,
  AudioResource,
} from "@discordjs/voice";
import {
  PermissionsBitField,
  VoiceChannel,
  VoiceBasedChannel,
} from "discord.js";

export async function playSoundInChannel(
  channel: VoiceChannel | VoiceBasedChannel,
  resource: AudioResource
): Promise<void> {
  const botMember = await channel.guild.members.fetchMe();
  const botPermissions = channel.permissionsFor(botMember);

  if (!botPermissions?.has(PermissionsBitField.Flags.PrioritySpeaker)) {
    // console.log(      "The bot does not have Priority Speaker permission. There may be issues joining full channels."    );
  }

  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild
        .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, async () => {
      const player = createAudioPlayer();
      player.play(resource);
      connection.subscribe(player);

      player.on(AudioPlayerStatus.Playing, () => {});

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });
    });

    connection.on("error", (error) => {
      console.error("Connection error:", error);
      connection.destroy();
    });
  } catch (error) {
    console.error("Error while attempting to connect and play audio:", error);
  }
}
