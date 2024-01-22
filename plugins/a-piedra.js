
const otorgarRecompensa = () => {
    const exp = Math.floor(Math.random() * 1001); 
    const dolares = Math.floor(Math.random() * 16); 
    const moneda = Math.random() < 0.7 ? 'exp' : 'dolares'; 
    return { tipo: moneda, cantidad: moneda === 'exp' ? exp : dolares };
}

const lanzarPiedra = (intensidad) => {
    const fuerza = Math.random() * 10 * intensidad;
    return fuerza;
}

const pvpLanzarPiedra = (player1, player2, conn, chatId) => {
    let jugadorActual = player1;
    let jugadorSiguiente = player2;
  
    let resultado = {
      [player1]: 0,
      [player2]: 0
    };
    
    for (let i = 1; i <= 10; i++) {
      let fuerzaJugadorActual = lanzarPiedra(Math.random());
      resultado[jugadorActual] += fuerzaJugadorActual;

      conn.reply(chatId, `${jugadorActual}, has lanzado la piedra con una fuerza de ${fuerzaJugadorActual.toFixed(2)}`);
      
      // Intercambiar jugadores para el siguiente turno
      let temp = jugadorActual;
      jugadorActual = jugadorSiguiente;
      jugadorSiguiente = temp;
    }
    
    const ganador = resultado[player1] > resultado[player2] ? player1 : resultado[player2] > resultado[player1] ? player2 : 'Empate';
    const recompensaGanador = otorgarRecompensa();
    const recompensaPerdedor = otorgarRecompensa();
  
    conn.reply(chatId, `Resultados del PVP: Ganador: ${ganador}, Recompensa Ganador: ${recompensaGanador.tipo === 'exp' ? recompensaGanador.cantidad + ' de experiencia' : '$' + recompensaGanador.cantidad}, Recompensa Perdedor: ${recompensaPerdedor.tipo === 'exp' ? recompensaPerdedor.cantidad + ' de experiencia' : '$' + recompensaPerdedor.cantidad}`);
};

const handler = async (message, conn, m) => {
    const player1 = message.sender;
    const player2 = 'player2'; // Asignar al segundo jugador
    const chatId = message.chatId; // Obtener el ID del chat
    pvpLanzarPiedra(player1, player2, conn, chatId);
};

handler.command = 'lanzapiedra';
handler.desc = 'Juego de lanzar piedra en un duelo PvP';
handler.register = true;
export default handler;
