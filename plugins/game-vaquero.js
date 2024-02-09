const handler = async (m, { conn, text }) => {
  const playerId = m.sender;
  const duelOutcome = Math.random() < 0.5 ? 'victoria' : 'derrota';

  const playerName = await getPlayerName(playerId);
  const opponentName = await getOpponentName();

  let resultMessage = '';
  let earnedMoney = 0;
  let imageURL = '';

  if (duelOutcome === 'victoria') {
    const victoryMessages = [
      `¡Enhorabuena, ${playerName}! Has demostrado tu destreza en el épico duelo vaquero contra ${opponentName}. 🏆`,
      `La habilidad de ${playerName} en el duelo vaquero no tiene rival. ¡Otro triunfo para ti! 🤠`,
      `Con valentía y destreza, ${playerName} ha ganado el duelo contra ${opponentName}. ¡Fantástico! 🌟`,
      `¡Victoria para ${playerName} en el duelo vaquero! Has dejado a ${opponentName} boquiabierto. 🎉`,
      `El oeste temblará al enterarse de la victoria de ${playerName} sobre ${opponentName}. ¡Increíble duelo! 🌄`,
      `Bravo, ${playerName} ha emergido victorioso en el polvoriento duelo vaquero contra ${opponentName}. 🤠🔥`,
      `¡Increíble destreza, ${playerName}! Has ganado el duelo vaquero desafiando a ${opponentName}. 🌵💪`,
      `La leyenda del oeste crece con la victoria de ${playerName} en el duelo contra ${opponentName}. 🌟🔫`,
      `¡Triunfo resonante! ${playerName} se erige como el vaquero dominante tras vencer a ${opponentName}. 🏇🎊`,
      `Con puntería precisa, ${playerName} ha ganado el duelo vaquero frente a ${opponentName}. ¡Espectacular! 🌄🤠`
    ];

    resultMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];

    // Ganar dinero aleatorio entre 1 y 50
    earnedMoney = Math.floor(Math.random() * 50) + 1;
    global.db.data.users[playerId].dolares += earnedMoney;

    // URL de la imagen de ganador
    imageURL = 'https://telegra.ph/file/7b9479c318cbf61ec671d.jpg';
  } else {
    const defeatMessages = [
      `Lamentablemente, ${playerName}, el duelo te ha llevado a la derrota frente a ${opponentName}. 🤠 ¡Prepárate para la revancha!`,
      `Parece que ${opponentName} ha superado a ${playerName} en este duelo vaquero. ¿La próxima vez será diferente?`,
      `Aunque la lucha fue intensa, ${playerName} no logró vencer a ${opponentName} en el duelo vaquero. ¡Inténtalo de nuevo! 💪`,
      `La sombra de la derrota ha caído sobre ${playerName} en el duelo contra ${opponentName}. ¡No te desanimes, hay más desafíos por delante! 🌅`,
      `En este duelo vaquero, ${opponentName} se ha llevado la victoria, dejando a ${playerName} con ganas de revancha. 🌵 ¡Ánimo, vaquero!`,
      `La astucia de ${opponentName} ha superado a ${playerName} en el duelo vaquero. ¡Prepárate para el próximo desafío! 🌄🤠`,
      `Aunque la victoria escapó esta vez, la leyenda de ${playerName} continúa. ¡La revancha está a la vuelta de la esquina! 🌟🏇`,
      `El duelo ha sido feroz, pero ${opponentName} emerge como el vaquero victorioso ante ${playerName}. ¡Próximo encuentro será épico! 🔫💔`,
      `La polvareda se disipa revelando la derrota de ${playerName} ante ${opponentName}. ¡Ánimo, vaquero, el camino sigue adelante! 🌵💨`,
      `En esta ocasión, ${opponentName} ha demostrado ser el vaquero más fuerte, dejando a ${playerName} con ganas de redención. 🌅🤠`
    ];

    resultMessage = defeatMessages[Math.floor(Math.random() * defeatMessages.length)];

    // URL de la imagen de perdedor
    imageURL = 'https://telegra.ph/file/f3b98ff2330302cfcd46e.jpg';
  }

  const additionalInfo = `\n\n\nGracias por participar 🌵 Si deseas más desafíos, simplemente solicítalos. ${earnedMoney > 0 ? `\n\nHas ganado ${earnedMoney} dólares. 💰` : ''}`;

  const finalMessage = `${resultMessage}\n\n${additionalInfo}`;

  // Enviar mensaje con imagen
  conn.sendFile(m.chat, imageURL, 'result.jpg', finalMessage, m);
}

const getPlayerName = async (playerId) => {
  // Implementa la lógica para obtener el nombre del jugador según su ID.
  // Por ahora, simplemente devuelve "Vaquero Anónimo".
  return "Vaquero Anónimo";
}

const getOpponentName = async () => {
  // Implementa la lógica para obtener el nombre del oponente.
  // Por ahora, simplemente devuelve "Rival Misterioso".
  return "Rival Misterioso";
}

handler.help = ['duelovaquero'];
handler.tags = ['game'];
handler.command = /^duelovaquero$/i;

export default handler;
