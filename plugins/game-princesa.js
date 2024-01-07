
let handler = async(m, { conn, text, usedPrefix, command, args }) => {


const juegosEnCurso = {};

conn.on('chat-update', async (chatUpdate) => {
  if (chatUpdate.messages && chatUpdate.messages.length > 0) {
    const message = chatUpdate.messages.all()[0];
    const userJID = message.key.remoteJID;

    if (message.body.toLowerCase() === '!comenzar') {
      iniciarJuego(userJID);
    } else if (message.body.toLowerCase() === '!estado') {
      mostrarEstado(userJID);
    } else if (message.body.toLowerCase() === '!ayuda') {
      mostrarInstrucciones(userJID);
    } else if (message.body.toLowerCase() === '!explorar') {
      explorarMazmorra(userJID);
    } else if (message.body.toLowerCase() === '!izquierda' || message.body.toLowerCase() === '!derecha') {
      tomarDecision(userJID, message.body.toLowerCase());
    } else if (message.body.toLowerCase().startsWith('!rescatar')) {
      const accion = message.body.split(' ')[1];
      if (accion === 'princesa') {
        rescatarPrincesa(userJID);
      } else {
        conn.sendMessage(userJID, 'Comando no válido. Intenta !rescatar princesa');
      }
    } else if (message.body.toLowerCase() === '!unirse') {
      unirseAMultijugador(userJID);
    }
    // Puedes agregar más comandos y lógica del juego aquí
  }
});

function iniciarJuego(userJID) {
  juegosEnCurso[userJID] = {
    estado: 'en_progreso',
    turnoActual: userJID,
    ubicacion: 'inicio',
    items: [],
    aventuraCompletada: false,
  };

  conn.sendMessage(userJID, '¡Bienvenido al juego de aventura! Tu misión es rescatar a la princesa de la mazmorra. ¡Comencemos!');
  mostrarInstrucciones(userJID);
}

function unirseAMultijugador(userJID) {
  if (!juegosEnCurso[userJID]) {
    conn.sendMessage(userJID, 'Te uniste a la partida multijugador. ¡Es tu turno!');
    juegosEnCurso[userJID] = {
      estado: 'en_progreso',
      turnoActual: userJID,
      ubicacion: 'inicio',
      items: [],
      aventuraCompletada: false,
    };
    mostrarInstrucciones(userJID);
  } else {
    conn.sendMessage(userJID, 'Ya estás en una partida. ¡Espera tu turno!');
  }
}

function turnoMultijugador(userJID) {
  return juegosEnCurso[userJID] && juegosEnCurso[userJID].estado === 'en_progreso' && juegosEnCurso[userJID].turnoActual === userJID;
}

function avanzarTurno(userJID) {
  const jugadores = Object.keys(juegosEnCurso);
  const indiceActual = jugadores.indexOf(userJID);
  const siguienteTurno = jugadores[(indiceActual + 1) % jugadores.length];
  juegosEnCurso[userJID].turnoActual = siguienteTurno;
}

function explorarMazmorra(userJID) {
  if (turnoMultijugador(userJID)) {
    const state = juegosEnCurso[userJID];
    // Lógica de exploración de mazmorra
    // ...

    // Avanzar al siguiente turno
    avanzarTurno(userJID);

    // Mostrar instrucciones al siguiente jugador
    conn.sendMessage(juegosEnCurso[userJID].turnoActual, '¡Es tu turno! Usa !explorar para continuar la aventura.');
  } else {
    conn.sendMessage(userJID, 'No es tu turno para explorar. ¡Espera tu turno!');
  }
}

// Resto de las funciones del juego siguen similar lógica multijugador

}
    
handler.help = handler.command = ['rescatarprincesa', 'princesa']
handler.tags = ['game']
export default handler