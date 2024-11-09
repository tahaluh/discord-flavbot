import { Message } from "discord.js";

export const handleMessageCreate = async (message: Message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "ping") {
    message.reply("pong");
  }

  if (message.channel.id === "1300940930336948305") {
    message.react("👍");

    const responses = [
      `Obrigado pela homenagem ${message.author.toString()}!`,
      `Que carinhoso`,
      `Muito obrigado!`,
      `Que lindo!`,
      `Obrigado!`,
      `Que fofo!`,
      `Que legal!`,
      `Você é incrível!`,
      `Fico emocionado!`,
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    message.reply({
      content: responses[randomIndex],
    });
  }
};
