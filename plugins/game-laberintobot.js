const handler = async (m, { conn, text }) => {
  const playerId = m.sender;
  const playerName = await getPlayerName(playerId);

  const mazeResult = Math.random() < 0.5 ? 'victoria' : 'derrota';

  let resultMessage = '';
  let earnedPoints = 0;
  let imageURL = '';

  if (mazeResult === 'victoria') {
    const victoryMessages = [
      `¡Increíble, ${playerName}! Has completado el laberinto. 🌟🎉`,
      `La astucia de ${playerName} prevalece. ¡Victoria en el LaberintoBot! 🧠💪`,
      `Con ingenio y determinación, ${playerName} ha superado el laberinto. ¡Felicidades! 🌐🔓`,
      `¡Triunfo para ${playerName} en el desafiante LaberintoBot! 🏆🔍`,
      `Con maestría, ${playerName} ha navegado por el LaberintoBot. ¡Fantástico! 🤖🗺️`,
      // Agrega más mensajes de victoria aquí
    ];

    resultMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];

    // Ganar puntos aleatorios entre 1 y 10
    earnedPoints = Math.floor(Math.random() * 10) + 1;
    // Agregar puntos al jugador en la base de datos
    global.db.data.users[playerId].puntos += earnedPoints;

    // URL de la imagen de ganador (puedes proporcionar una imagen personalizada)
    imageURL = 'https://telegra.ph/file/98f1dce5ee45e63813eff.jpg';
  } else {
    const defeatMessages = [
      `Lamentablemente, ${playerName}, no lograste completar el LaberintoBot. 🤖💔 ¡Inténtalo de nuevo!`,
      `Otra vez será, ${playerName}. El LaberintoBot ha demostrado ser desafiante. 🔍🤷‍♂️`,
      `Aunque el camino fue difícil, ${playerName} no pudo superar el LaberintoBot. ¡Sigue intentándolo! 🏞️🤖`,
      `El ingenioso LaberintoBot ha vencido a ${playerName} en esta ocasión. Pero la revancha es posible. 🌐🔄`,
      `La red de caminos confundió a ${playerName} en el LaberintoBot. ¡Prepárate para otro intento! 🤔🗺️`,
      // Agrega más mensajes de derrota aquí
    ];

    resultMessage = defeatMessages[Math.floor(Math.random() * defeatMessages.length)];

    // URL de la imagen de perdedor (puedes proporcionar una imagen personalizada)
    imageURL = 'https://telegra.ph/file/08a35808ab47dfb4ed2ec.jpg';
  }

  const additionalInfo = `Gracias por participar en el LaberintoBot. 🤖 Si deseas más desafíos, simplemente solicítalos. ${earnedPoints > 0 ? `\n\nHas ganado ${earnedPoints} puntos. 🌟` : ''}`;

  const finalMessage = `${resultMessage}\n\n${additionalInfo}`;

  // Enviar mensaje con imagen (ajusta la URL según corresponda)
  conn.sendFile(m.chat, imageURL, 'result.jpg', finalMessage, m);
}

const getPlayerName = async (playerId) => {
  // Implementa la lógica para obtener el nombre del jugador según su ID.
  // Por ahora, simplemente devuelve "Explorador Anónimo".
  return "Explorador Anónimo";
}

handler.help = ['laberintobot'];
handler.tags = ['game'];
handler.command = /^laberintobot$/i;

export default handler;
