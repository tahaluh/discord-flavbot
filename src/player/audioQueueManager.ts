import { AudioQueue } from "./audioQueue";

class AudioQueueManager {
  private queues: Map<string, AudioQueue> = new Map();

  getQueue(guildId: string): AudioQueue {
    if (!this.queues.has(guildId)) {
      this.queues.set(guildId, new AudioQueue());
    }
    return this.queues.get(guildId)!;
  }
}

export const audioQueueManager = new AudioQueueManager();
