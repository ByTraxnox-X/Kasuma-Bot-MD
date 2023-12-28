let warSessions = new Map();
let teamAssignments = new Map();

function createArmy(size, strength) {
  return new Array(size).fill(strength);
}

function attackEnemy(army, enemyArmy) {
  const attackPower = Math.floor(Math.random() * 10) + 1;
  const enemyIndex = Math.floor(Math.random() * enemyArmy.length);

  if (enemyArmy[enemyIndex] > attackPower) {
    army.pop(); // Si el ataque del enemigo es más fuerte, perdemos una unidad
  } else {
    enemyArmy.splice(enemyIndex, 1); // Si nuestro ataque es más fuerte, eliminamos una unidad del enemigo
  }
}

function printBattleStatus(conn, m, team, army, enemyArmy) {
  let result = `*Batalla en curso*\n\nEquipo ${team}:\n`;
  result += `Tu ejército: ${army.length} unidades\n`;
  result += `Ejército enemigo: ${enemyArmy.length} unidades\n`;
  conn.reply(m.chat, result, m);
}

function joinTeam(userId, team) {
  teamAssignments.set(userId, team);
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const input = m.text.trim().toLowerCase();

  if (input === 'iniciarguerra') {
    if (!warSessions.has(userId)) {
      conn.reply(m.chat, '*Primero, únete a un equipo con !guerra join a o !guerra join b.*', m);
      return;
    }

    const team = teamAssignments.get(userId);
    const enemyTeam = team === 'a' ? 'b' : 'a';

    const userArmy = createArmy(5, 8); // Ejército del usuario con 5 unidades de fuerza 8
    const enemyArmy = createArmy(5, 7); // Ejército enemigo con 5 unidades de fuerza 7

    warSessions.set(userId, { team, userArmy, enemyTeam, enemyArmy });

    conn.reply(m.chat, '*¡Prepárate para la batalla!*', m);

    printBattleStatus(conn, m, team, userArmy, enemyArmy);
  } else if (input.startsWith('guerra join')) {
    const team = input.split(' ')[2];
    if (team === 'a' || team === 'b') {
      joinTeam(userId, team);
      conn.reply(m.chat, `*Te has unido al equipo ${team.toUpperCase()}.*`, m);
    } else {
      conn.reply(m.chat, '*Por favor, únete a un equipo válido: A o B.*', m);
    }
  }
};

handler.help = ['guerra', 'iniciarguerra', 'join'];
handler.tags = ['game'];
handler.command = /^(guerra)$/i;

handler.before = async (m, { conn }) => {
  const userId = m.sender;
  const input = m.text.trim().toLowerCase();

  if (input === 'atacar') {
    if (!warSessions.has(userId)) {
      conn.reply(m.chat, '*Primero, inicia una guerra con !guerra iniciarguerra.*', m);
      return;
    }

    const team = teamAssignments.get(userId);
    const warSession = warSessions.get(userId);
    attackEnemy(warSession.userArmy, warSession.enemyArmy);
    printBattleStatus(conn, m, team, warSession.userArmy, warSession.enemyArmy);

    if (warSession.userArmy.length === 0) {
      conn.reply(m.chat, '*¡Tu ejército ha sido derrotado!*\n*¡Has perdido la guerra!*', m);
      warSessions.delete(userId);
    } else if (warSession.enemyArmy.length === 0) {
      conn.reply(m.chat, `*¡Has derrotado al equipo ${warSession.enemyTeam.toUpperCase()}!*`, m);
      warSessions.delete(userId);
    }
  } else if (input === 'cancelar') {
    conn.reply(m.chat, '*Has cancelado la guerra.*', m);
    warSessions.delete(userId);
  }
};

export default handler;
