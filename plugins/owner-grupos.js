import fs from 'fs';

const isUserBlockedInGroup = (userId, groupName) => {
  return (
    global.db.data.blockedUsers &&
    global.db.data.blockedUsers[userId] &&
    global.db.data.blockedUsers[userId].includes(groupName)
  );
};

const handler = async (m, { conn }) => {
  let txt = 'Lista de grupos\n';

  // Obtener la lista de grupos
  const groups = Object.values(await conn.groupFetchAllParticipating());

  for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
    txt += `\nNombre del grupo: ${await conn.getName(jid)}\nID del grupo: ${jid} [${chat?.metadata?.read_only ? 'No participa' : 'Participa'}]\n`;

    // Verificar si el usuario y el bot están en el mismo grupo
    const isUserInGroup = groups.find(group => group.id === jid);
    if (isUserInGroup) {
      // Verificar y mostrar usuarios bloqueados en este grupo
      if (global.db.data.blockedUsers) {
        const blockedUsers = global.db.data.blockedUsers[m.sender];
        if (blockedUsers && blockedUsers.includes(jid)) {
          txt += `  - @${m.sender.split('@')[0]} está bloqueado en este grupo\n`;
        }
      }
    }

    txt += '\n';
  }

  conn.reply(m.chat, txt.trim(), m);
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
