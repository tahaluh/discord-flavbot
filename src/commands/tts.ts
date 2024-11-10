import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getTTSResource } from "../utils/getTTSResource";
import { getUserVoiceChannel } from "../utils/getUserVoiceChannel";
import { QueueItemTypes } from "../player/audioQueue";
import { audioQueueManager } from "../player/audioQueueManager";

const data = new SlashCommandBuilder()
  .setName("tts")
  .setDescription("Faz o bot falar uma mensagem")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("A mensagem que o bot vai falar (até 200 caracteres)")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("language")
      .setDescription("O idioma da mensagem")
      .setRequired(false)
  );

async function execute(interaction: CommandInteraction) {
  const message = interaction.options.get("message")!.value as string;
  const language = interaction.options.get("language")?.value as string;

  if (!message) {
    return interaction.reply("Mensagem inválida.");
  }

  if (message.length > 200) {
    return interaction.reply("Mensagem muito longa.");
  }

  const targetChannel = await getUserVoiceChannel(
    interaction.guild!,
    interaction.user.id
  );

  if (!targetChannel) {
    return interaction.editReply("Você precisa estar em um canal de voz.");
  }

  await interaction.reply("🦜");

  const resource = await getTTSResource(message, language ?? "pt-BR", false);

  const onResourceEnd = async () => {
    await interaction.followUp("🦜");
  };

  await audioQueueManager
    .getQueue(interaction.guildId!)
    .addToQueue(
      resource,
      targetChannel,
      QueueItemTypes.TTS,
      undefined,
      onResourceEnd
    );
}

export const tts = { data, execute };
