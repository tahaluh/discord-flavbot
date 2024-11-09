import { handleInteractionCreate } from "./interactionCreate";
import { handleMessageCreate } from "./messageCreate";
import { handleReady } from "./ready";
import { handleVoiceStateUpdate } from "./voiceStateUpdate";

export const events = {
  interactionCreate: handleInteractionCreate,
  messageCreate: handleMessageCreate,
  ready: handleReady,
  voiceStateUpdate: handleVoiceStateUpdate,
};
