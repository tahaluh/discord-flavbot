import { VoiceState } from "discord.js";
import { QueueItemTypes } from "../player/audioQueue";
import { getTTSResource } from "../utils/getTTSResource";
import { audioQueueManager } from "../player/audioQueueManager";

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

  const audioQueue = audioQueueManager.getQueue(newState.guild.id);

  if (!audioQueue.justWelcome()) {
    return;
  }

  const targetChannel = newState.channel;

  const joinUserChannel = () => {
    audioQueue.changeChannel(targetChannel!);
  };

  const message = getWelcomeMessage(newState.member!.displayName);
  const resource = await getTTSResource(message, "pt-BR", false);

  audioQueue.addToQueue(
    resource,
    targetChannel!,
    QueueItemTypes.WELCOME,
    joinUserChannel
  );
};

function getWelcomeMessage(name: string) {
  const messageOptions = [
    `Bem-vindo, ${name}!`,
    `Olá, ${name}!`,
    `Oi, ${name}! Que bom te ver aqui!`,
    `E aí, ${name}? Bem-vindo ao servidor!`,
    `Oi oi, ${name}!`,
    `Seja muito bem-vindo, ${name}!`,
    `Salve, salve, ${name}!`,
    `É um prazer te receber, ${name}!`,
    `Opa! Bem-vindo, ${name}!`,
    `Hey, ${name}! Tudo bem?`,
    `Como vai, ${name}?`,
    `Boas-vindas, ${name}!`,
    `A casa é sua, ${name}!`,
    `Chegou quem faltava! Bem-vindo, ${name}!`,
    `Oba, olha quem chegou! Bem-vindo, ${name}!`,
    `Oi, ${name}! Que bom que você veio!`,
    `Saudações, ${name}!`,
    `Alô, alô, ${name}, bem-vindo!`,
    `Estamos felizes em te ter aqui, ${name}!`,
    `Oi, ${name}! Sinta-se em casa!`,
  ];

  return messageOptions[Math.floor(Math.random() * messageOptions.length)];
}
