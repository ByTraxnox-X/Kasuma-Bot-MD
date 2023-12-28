const warSessions = new Map();
const teamAssignments = new Map();

function createArmy(units, strength) {
  const army = [];
  for (let i = 0; i < units; i++) {
    army.push(strength);
  }
  return army;
}

function printBattleStatus(conn, m, team, userArmy, enemyArmy) {
  let result = `*Estado de la Batalla*\n\nTu equipo (${team.toUpperCase()}): ${userArmy.join(' ')}\nEquipo Enemigo: ${enemyArmy.join(' ')}`;
  conn.reply(m.chat, result, m);
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const input = m.text.trim().toLowerCase();

  console.log('Input:', input);

  if (input === 'iniciarguerra') {
    console.log('Iniciando guerra...');
    if (!warSessions.has(userId)) {
      console.log('Usuario no registrado en la guerra.');
      conn.reply(m.chat, '*Primero, únete a un equipo con !guerra join a o !guerra join b.*', m);
      return;
    }

    const team = teamAssignments.get(userId);
    const enemyTeam = team === 'a' ? 'b' : 'a';

    const userArmy = createArmy(5, 8);
    const enemyArmy = createArmy(5, 7);

    warSessions.set(userId, { team, userArmy, enemyTeam, enemyArmy });

    conn.reply(m.chat, '*¡Prepárate para la batalla!*', m);

    printBattleStatus(conn, m, team, userArmy, enemyArmy);
  } else if (input.startsWith('guerra join')) {
    console.log('Intento unirse a la guerra...');
    const team = input.split(' ')[2];
    if (team === 'a' || team === 'b') {
      joinTeam(userId, team, conn, m);
      conn.reply(m.chat, `*Te has unido al equipo ${team.toUpperCase()}.*`, m);
    } else {
      conn.reply(m.chat, '*Por favor, únete a un equipo válido: A o B.*', m);
    }
  }
};

function joinTeam(userId, team, conn, m) {
  if (!warSessions.has(userId)) {
    warSessions.set(userId, { team });
    teamAssignments.set(userId, team);
  } else {
    conn.reply(m.chat, '*Ya estás en la guerra.*', m);
  }
}

handler.help = ['guerra'];
handler.tags = ['game'];
handler.command = /^(guerra)$/i;
handler.group = true;
export default handler;
