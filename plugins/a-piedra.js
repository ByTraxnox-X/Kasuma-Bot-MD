
const otorgarRecompensa = () => {
    const exp = Math.floor(Math.random() * 1001); // Valor aleatorio entre 0 y 1000
    const dolares = Math.floor(Math.random() * 16); // Valor aleatorio entre 0 y 15
    const moneda = Math.random() < 0.7 ? 'exp' : 'dolares'; // 70% de probabilidad de recibir experiencia
    return { tipo: moneda, cantidad: moneda === 'exp' ? exp : dolares };
}

const lanzarPiedra = (intensidad) => {
    const fuerza = Math.random() * 10 * intensidad;
    return fuerza;
}

const pvpLanzarPiedra = (player1, player2, m) => {
    let jugadorActual = player1;
    let jugadorSiguiente = player2;
  
    let resultado = {
      [player1]: 0,
      [player2]: 0
    };
    
    for (let i = 1; i <= 10; i++) {
      let fuerzaJugadorActual = lanzarPiedra(Math.random());
      resultado[jugadorActual] += fuerzaJugadorActual;

      m.reply(jugadorActual, `Has lanzado la piedra con una fuerza de ${fuerzaJugadorActual.toFixed(2)}`);
      
      // Intercambiar jugadores para el siguiente turno
      let temp = jugadorActual;
      jugadorActual = jugadorSiguiente;
      jugadorSiguiente = temp;
    }
    
    const ganador = resultado[player1] > resultado[player2] ? player1 : resultado[player2] > resultado[player1] ? player2 : 'Empate';
    const recompensaGanador = otorgarRecompensa();
    const recompensaPerdedor = otorgarRecompensa();
  
    m.reply(player1, `Resultados del PVP: Ganador: ${ganador}, Recompensa Ganador: ${recompensaGanador.tipo === 'exp' ? recompensaGanador.cantidad + ' de experiencia' : '$' + recompensaGanador.cantidad}, Recompensa Perdedor: ${recompensaPerdedor.tipo === 'exp' ? recompensaPerdedor.cantidad + ' de experiencia' : '$' + recompensaPerdedor.cantidad}`);
    m.reply(player2, `Resultados del PVP: Ganador: ${ganador}, Recompensa Ganador: ${recompensaGanador.tipo === 'exp' ? recompensaGanador.cantidad + ' de experiencia' : '$' + recompensaGanador.cantidad}, Recompensa Perdedor: ${recompensaPerdedor.tipo === 'exp' ? recompensaPerdedor.cantidad + ' de experiencia' : '$' + recompensaPerdedor.cantidad}`);
};

const handler = async (message, m) => {
    const player1 = message.sender;
    const player2 = 'player2'; // Asignar al segundo jugador
    pvpLanzarPiedra(player1, player2, m);
};

handler.command = 'lanzapiedra';
handler.desc = 'Juego de lanzar piedra en un duelo PvP';
handler.register = true;
export default handler;