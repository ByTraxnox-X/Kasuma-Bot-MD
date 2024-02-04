import fs from 'fs';

const handler = async (m, { conn }) => {
  let txt = 'Lista de grupos\n';

  // Obtener la lista de grupos
  const groups = Object.values(await conn.groupFetchAllParticipating());

  for (const group of groups) {
    const groupName = group.subject || group.id;

    let blockedTxt = '';

    // Verificar y mostrar usuarios bloqueados en este grupo
    if (global.db.data.blockedUsers) {
      const blockedUsers = global.db.data.blockedUsers[conn.user.jid];
      const blockedUsersInGroup = blockedUsers?.filter(user => user.endsWith('@g.us') && group.participants.find(p => p.jid === user));

      if (blockedUsersInGroup && blockedUsersInGroup.length > 0) {
        blockedTxt = `, Bloqueados: ${blockedUsersInGroup.map(user => `@${user.split('@')[0]}`).join(', ')}`;
      }
    }

    txt += `\nNombre del grupo: ${groupName}\nID del grupo: ${group.id} [${group.metadata?.read_only ? 'No participa' : 'Participa'}${blockedTxt}]\n\n`;
  }

  conn.reply(m.chat, txt.trim(), m);
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
