const warSessions = new Map();
const teamAssignments = new Map();

function joinTeam(userId, team, conn, m) {
  console.log('Intento unirse a la guerra...');
  if (!warSessions.has(userId)) {
    warSessions.set(userId, { team });
    teamAssignments.set(userId, team);
    conn.reply(m.chat, `*Te has unido al equipo ${team.toUpperCase()}.*`, m);
  } else {
    conn.reply(m.chat, '*Ya estás en la guerra.*', m);
  }
}

function startWar(userId, conn, m) {
  console.log('Iniciando guerra...');
  if (!warSessions.has(userId)) {
    conn.reply(m.chat, '*Primero, únete a un equipo con !guerra join a o !guerra join b.*', m);
    return;
  }

  const team = teamAssignments.get(userId);
  conn.reply(m.chat, `*¡La guerra ha comenzado para el equipo ${team.toUpperCase()}!*`, m);
}

let handler = async (m, { conn }) => {
  const userId = m.sender;
  const input = m.text.trim().toLowerCase();

  console.log('Input:', input);

  if (input.startsWith('guerra join')) {
    const team = input.split(' ')[2];
    if (team === 'a' || team === 'b') {
      joinTeam(userId, team, conn, m);
    } else {
      conn.reply(m.chat, '*Por favor, únete a un equipo válido: A o B.*', m);
    }
  } else if (input === 'iniciarguerra') {
    startWar(userId, conn, m);
  }
};

handler.help = ['guerra'];
handler.tags = ['game'];
handler.command = /^(guerra)$/i;
handler.group = true;
export default handler;
