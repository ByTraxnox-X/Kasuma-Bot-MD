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
  let blockedTxt = '';

  // Obtener la lista de grupos
  const groups = Object.values(await conn.groupFetchAllParticipating());

  for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
    const groupName = await conn.getName(jid);
    const groupId = jid;

    txt += `\nNombre del grupo: ${groupName}\nID del grupo: ${groupId} [${chat?.metadata?.read_only ? 'No participa' : 'Participa'}]`;

    // Verificar si el usuario y el bot están en el mismo grupo
    const isUserInGroup = groups.find(group => group.id === jid);
    if (isUserInGroup) {
      // Verificar y mostrar usuarios bloqueados en este grupo
      if (global.db.data.blockedUsers) {
        const blockedUsers = global.db.data.blockedUsers[conn.user.jid];
        const blockedUsersInGroup = blockedUsers?.filter(user => groups.find(group => group.participants.find(p => p.jid === user) && group.id === jid));

        if (blockedUsersInGroup && blockedUsersInGroup.length > 0) {
          blockedTxt += `\nBloqueados en ${groupName}: ${blockedUsersInGroup.map(user => `@${user.split('@')[0]}`).join(', ')}`;
        }
      }
    }

    txt += '\n\n';
  }

  // Agregar la sección de usuarios bloqueados al final del mensaje
  txt += blockedTxt;

  conn.reply(m.chat, txt.trim(), m);
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
