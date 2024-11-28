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

  if (message.content === "ping") {
    message.reply("pong");
  }

  console.log(message.content);

  if (isRollMessage(message.content)) {
    const result = rollDice(message.content);
    message.reply(result);
  }
};

function isRollMessage(message: string) {
  const diceRegex =
    /^(\d+)?#?(\d*)d(\d+)([+-]\d+)?|([+-]\d*)d(\d+)|([+-]\d+)/gi;
  return diceRegex.test(message);
}
function rollDice(expression: string): string {
  // Regex para capturar sequências de dados (como "2d20", "3d6") e modificadores numéricos (como "+5")
  const dicePattern = /(\d+)d(\d+)/g;
  const modifierPattern = /([+-]\d+)/g;

  let match;
  let totalSum = 0;
  const rollDescriptions: string[] = [];

  // Processa todas as rolagens de dados (como "2d20", "3d6", etc.)
  while ((match = dicePattern.exec(expression)) !== null) {
    const qtdDados = parseInt(match[1], 10); // Número de dados
    const maxDado = parseInt(match[2], 10); // Máximo valor de cada dado

    const valoresIndividuais: number[] = [];
    let somaDados = 0;

    for (let i = 0; i < qtdDados; i++) {
      const valor = Math.floor(Math.random() * maxDado) + 1;
      valoresIndividuais.push(valor);
      somaDados += valor;
    }

    totalSum += somaDados;
    rollDescriptions.push(
      `[${valoresIndividuais.join(", ")}] ${qtdDados}d${maxDado}`
    );
  }

  // Processa todos os modificadores numéricos adicionais (como "+5" ou "-3")
  while ((match = modifierPattern.exec(expression)) !== null) {
    const modifier = parseInt(match[0], 10);
    totalSum += modifier;
    rollDescriptions.push(`${modifier}`);
  }

  // Monta a string final de resultado
  const resultado = `${totalSum} <- ${rollDescriptions.join(" + ")}`;
  return resultado;
}
