import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getChannelWithMostMembers } from "../utils/getChannelWithMostMembers";
import { playSoundInChannel } from "../utils/playSoundInChannel";
import { moveAllMembersToChannel } from "../utils/moveAllMembersToChannel";
import { getTTSResource } from "../utils/getTTSResource";
import { getUserVoiceChannel } from "../utils/getUserVoiceChannel";

const data = new SlashCommandBuilder()
  .setName("tts")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription(
        "A mensagem que o bot vai falar (Desde que tenha até 200 caracteres)"
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("language")
      .setDescription("O idioma da mensagem")
      .setRequired(false)
  )
  .setDescription("Faz o bot falar uma mensagem");

async function execute(interaction: CommandInteraction) {
  const mensagem = interaction.options.get("message")!.value as string;
  const language = interaction.options.get("language")?.value as string;

  if (!mensagem) {
    return interaction.reply("Mensagem inválida");
  }

  if (mensagem.length > 200) {
    return interaction.reply("Mensagem muito longa");
  }

  const targetChannel = await getUserVoiceChannel(
    interaction.guild!,
    interaction.user.id
  );

  if (!targetChannel) {
    return interaction.editReply("Não encontrei nenhuma call ativa");
  }

  await interaction.reply("Papagaio ativado! 🦜");

  await moveAllMembersToChannel(targetChannel);

  const resource = await getTTSResource(mensagem, language ?? "pt-BR", false);

  await playSoundInChannel(targetChannel, resource);

  await interaction.followUp("Tá falado! 🦜");
}

export const tts = { data, execute };
