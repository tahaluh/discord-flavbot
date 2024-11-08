import { VoiceState } from "discord.js";
import { audioQueue, QueueItemTypes } from "../player/audioQueue";
import { getTTSResource } from "../utils/getTTSResource";

export const handleVoiceStateUpdate = async (
  oldState: VoiceState,
  newState: VoiceState
) => {
  if (newState.member?.user.bot) {
    return;
  }

  if (!(!oldState.channelId && newState.channelId)) {
    return;
  }

  if (!audioQueue.justWelcome()) {
    return;
  }

  const targetChannel = newState.channel;

  const joinUserChannel = () => {
    audioQueue.changeChannel(targetChannel!);
  };

  const message = "Bem vindo, " + newState.member?.displayName;
  const resource = await getTTSResource(message, "pt-BR", false);

  audioQueue.addToQueue(
    resource,
    targetChannel!,
    QueueItemTypes.WELCOME,
    joinUserChannel
  );
};
