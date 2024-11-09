import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  AudioResource,
  VoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus,
  DiscordGatewayAdapterCreator,
} from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export enum QueueItemTypes {
  TTS = "tts",
  PLAY = "play",
  WELCOME = "WELCOME",
  OTHER = "other",
}

type QueueItem = {
  type: QueueItemTypes;
  resource: AudioResource;
  onStart?: () => void;
  onEnd?: () => void;
};

export class AudioQueue {
  private queue: QueueItem[] = [];
  private player = createAudioPlayer();
  private connection: VoiceConnection | null = null;

  constructor() {
    this.player.on(AudioPlayerStatus.Idle, () => {
      this.handleEndOfAudio();
    });

    this.player.on("error", (error) => {
      console.error("Erro no player de áudio:", error);
      this.playNext();
    });
  }

  public async connectToChannel(channel: VoiceBasedChannel) {
    if (
      !this.connection ||
      this.connection.state.status === VoiceConnectionStatus.Disconnected
    ) {
      this.connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild
          .voiceAdapterCreator as DiscordGatewayAdapterCreator,
      });

      this.connection.on(VoiceConnectionStatus.Disconnected, () => {
        this.connection?.destroy();
        this.connection = null;
      });

      this.connection.subscribe(this.player);
    }
  }

  public async changeChannel(channel: VoiceBasedChannel) {
    if (this.connection) {
      this.connection.destroy();
      this.connection = null;
    }
    await this.connectToChannel(channel);
  }

  public async addToQueue(
    resource: AudioResource,
    channel: VoiceBasedChannel,
    type: QueueItemTypes = QueueItemTypes.OTHER,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    await this.connectToChannel(channel);
    this.queue.push({ resource, onStart, onEnd, type });
    if (this.player.state.status === AudioPlayerStatus.Idle) {
      this.playNext();
    }
  }

  private handleEndOfAudio() {
    const currentItem = this.queue.shift();
    if (currentItem && currentItem.onEnd) {
      currentItem.onEnd();
    }
    this.playNext();
  }

  private playNext() {
    if (this.queue.length === 0) {
      if (this.connection) this.connection.destroy();
      this.connection = null;
      return;
    }

    const nextItem = this.queue[0];
    if (nextItem && nextItem.onStart) {
      nextItem.onStart();
    }

    this.player.play(nextItem.resource);
  }

  public clearQueue() {
    this.queue = [];
    this.player.stop();
    if (this.connection) {
      this.connection.destroy();
      this.connection = null;
    }
  }

  public skip() {
    this.player.stop();
  }

  public getQueueSize() {
    return this.queue.length;
  }

  public justWelcome() {
    return this.queue.every((item) => item.type === QueueItemTypes.WELCOME);
  }
}

export const audioQueue = new AudioQueue();
