const handler = async (m, { conn, text }) => {
  const playerId = m.sender;
  const playerName = await getPlayerName(playerId);
  
  const raceResult = Math.random() < 0.5 ? 'victoria' : 'derrota';

  let resultMessage = '';
  let earnedMoney = 0;
  let imageURL = '';

  if (raceResult === 'victoria') {
    const victoryMessages = [
      `¡Felicidades, ${playerName}! Has ganado la Carrera Espacial. 🚀🏆`,
      `Increíble velocidad, ${playerName}. ¡Victoria en la Carrera Espacial! 🌌🎉`,
      `La destreza de ${playerName} ha brillado en la Carrera Espacial. ¡Triunfo merecido! 🚀✨`,
      `¡Ganador indiscutible! ${playerName} lidera la Carrera Espacial hacia la victoria. 🥇🚀`,
      `Con velocidad estelar, ${playerName} ha conquistado la Carrera Espacial. ¡Impresionante! 🌠🏁`,
    ];

    resultMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];

    // Ganar dinero aleatorio entre 1 y 15
    earnedMoney = Math.floor(Math.random() * 15) + 1;
    // Agregar dinero al jugador en la base de datos
    global.db.data.users[playerId].dolares += earnedMoney;

    // URL de la imagen de ganador
    imageURL = 'https://telegra.ph/file/0fb59fe57449a262c400a.jpg';
  } else {
    const defeatMessages = [
      `Lamentablemente, ${playerName}, no lograste ganar la Carrera Espacial. 🚀💔 ¡Inténtalo de nuevo!`,
      `Otra vez será, ${playerName}. La Carrera Espacial te ha resultado esquiva. 🌌🤷‍♂️`,
      `Aunque el camino fue duro, ${playerName} no pudo vencer en la Carrera Espacial. ¡Sigue intentándolo! 🚀🌠`,
      `El cosmos fue desafiante para ${playerName} en esta ocasión. Pero la próxima Carrera Espacial puede ser tuya. 🌌🏁`,
      `La estrella de ${playerName} se eclipsó en la Carrera Espacial. ¡Prepárate para la revancha! 🚀🌑`,
    ];

    resultMessage = defeatMessages[Math.floor(Math.random() * defeatMessages.length)];

    // URL de la imagen de perdedor
    imageURL = 'https://telegra.ph/file/f0d55ded2ae968c6a9635.jpg';
  }

  const additionalInfo = `\n\n\nGracias por participar en la Carrera Espacial. 🚀 Si deseas más emocionantes desafíos, simplemente solicítalos. ${earnedMoney > 0 ? `\n\nHas ganado ${earnedMoney} dólares. 💰` : ''}`;

  const finalMessage = `${resultMessage}\n\n${additionalInfo}`;

  // Enviar mensaje con imagen
  conn.sendFile(m.chat, imageURL, 'result.jpg', finalMessage, m);
}

const getPlayerName = async (playerId) => {
  // Implementa la lógica para obtener el nombre del jugador según su ID.
  // Por ahora, simplemente devuelve "Piloto Anónimo".
  return "Piloto Anónimo";
}

handler.help = ['carreraespacial'];
handler.tags = ['game'];
handler.command = /^carreraespacial$/i;

export default handler;
