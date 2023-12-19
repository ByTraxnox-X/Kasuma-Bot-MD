import * as util from 'util';

function generarEnfrentamientos(equipos) {
  if (equipos.length < 2) {
    throw new Error("Se necesitan al menos dos equipos para generar enfrentamientos.");
  }

  const equiposMezclados = equipos.sort(() => Math.random() - 0.5);

  const enfrentamientos = [];
  const jugadores = equiposMezclados.flat();

  while (jugadores.length > 0) {
    const jugador1 = jugadores.pop();
    const jugador2 = jugadores.pop();

    if (jugador1 && jugador2) {
      enfrentamientos.push([jugador1, jugador2]);
    }
  }

  return enfrentamientos;
}

function handler(m, { text }) {
  if (!text) throw `Ingrese al menos dos equipos separados por espacios, por ejemplo, "!formarequipos equipo1 equipo2 equipo3 equipo4"`;

  const equipos = text.trim().split(' ');

  try {
    const enfrentamientos = generarEnfrentamientos(equipos);

    const respuesta = enfrentamientos.map(enfrentamiento => `${enfrentamiento[0]} *vs* ${enfrentamiento[1]}`).join('\n');

    m.reply(`\t*Enfrentamientos:*\n\n${respuesta}`);
  } catch (error) {
    m.reply(error.message);
  }
}

handler.help = ['formarequipos equipo1 equipo2 equipo3...'];
handler.tags = ['fun'];
handler.command = ['formarequipos'];
handler.group = true;

export default handler;
