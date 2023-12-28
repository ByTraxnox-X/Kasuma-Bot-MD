let rpgSessions = new Map();

let handler = async (m, { conn }) => {
  const userId = m.sender;

  // Verifica si hay una sesión de RPG en curso para el usuario
  if (rpgSessions.has(userId)) {
    // Si hay una sesión en curso, procesa la entrada del usuario para continuar el juego
    processRPGInput(m, userId);
  } else {
    // Si no hay una sesión en curso, comienza una nueva aventura
    startNewAdventure(m, userId);
  }
};

// Función para comenzar una nueva aventura RPG
function startNewAdventure(m, userId) {
  // Puedes personalizar la configuración inicial de la aventura aquí
  const adventure = {
    playerName: m.sender,
    playerHP: 100,
    enemyHP: 50,
    currentChallenge: '¡Te encuentras con un monstruo! ¿Qué haces?',
    choices: ['Atacar', 'Huir'],
  };

  // Guarda la nueva sesión de RPG para el usuario
  rpgSessions.set(userId, adventure);

  // Envía el primer desafío al usuario
  sendRPGChallenge(m, adventure);
}

// Función para procesar la entrada del usuario y avanzar en la aventura RPG
function processRPGInput(m, userId) {
  // Obtiene la sesión de RPG actual del usuario
  const adventure = rpgSessions.get(userId);

  // Procesa la elección del usuario
  const userChoice = m.text.trim().toLowerCase();
  if (adventure.choices.includes(userChoice)) {
    // Dependiendo de la elección del usuario, puedes ajustar la aventura aquí
    if (userChoice === 'atacar') {
      // Implementa la lógica para el ataque
      // Puedes ajustar la lógica según tus necesidades
      const damage = Math.floor(Math.random() * 10) + 1;
      adventure.enemyHP -= damage;

      if (adventure.enemyHP <= 0) {
        // El enemigo fue derrotado
        m.reply(`¡Has derrotado al monstruo! ¡Ganas la batalla!`);
        // Finaliza la sesión de RPG
        rpgSessions.delete(userId);
      } else {
        // El enemigo aún tiene HP, continúa la aventura
        sendRPGChallenge(m, adventure);
      }
    } else if (userChoice === 'huir') {
      // Implementa la lógica para huir
      // Puedes ajustar la lógica según tus necesidades
      m.reply(`¡Has logrado escapar del monstruo! ¡Aventura concluida!`);
      // Finaliza la sesión de RPG
      rpgSessions.delete(userId);
    }
  } else {
    // La elección del usuario no es válida, envía un mensaje de error
    m.reply('Por favor, elige una opción válida.');
    // Muestra nuevamente el desafío actual
    sendRPGChallenge(m, adventure);
  }
}

// Función para enviar un desafío RPG al usuario
function sendRPGChallenge(m, adventure) {
  // Lista de desafíos posibles, agrégales tantos como desees
  const challenges = [
    'Te encuentras con un monstruo. ¿Cómo reaccionas?',
    'Encuentras un cofre del tesoro. ¿Lo abres?',
    'Un mago te desafía a un duelo de hechizos. ¿Aceptas?',
    'Un puente inestable cruza un abismo. ¿Lo cruzas o buscas otra ruta?',
  ];

  // Selecciona un desafío aleatorio
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

  // Actualiza la aventura con el nuevo desafío
  adventure.currentChallenge = randomChallenge;

  // Construye el mensaje con el desafío y las opciones
  const message = `**${adventure.playerName}, estás en una aventura épica.**\n\n${adventure.currentChallenge}\n\n*Opciones:*\n${adventure.choices
    .map((choice) => `- ${choice}`)
    .join('\n')}`;

  // Envía el mensaje al usuario
  conn.reply(m.chat, message, m);
}

handler.help = ['rpg'];
handler.tags = ['game'];
handler.command = /^(rpg)$/i;
handler.group = true;

export default handler;
