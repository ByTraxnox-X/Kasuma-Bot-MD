import fs from 'fs';

const handler = async (m, { conn }) => {
  let txt = 'Lista de grupos\n';

  // Obtener la lista de grupos
  const groups = Object.values(await conn.groupFetchAllParticipating());

  for (const group of groups) {
    const groupName = group.subject || group.id;
    const groupId = group.id;
    const participationStatus = group.metadata?.read_only ? 'No participa' : 'Participa';

    // Verificar y mostrar usuarios bloqueados en este grupo
    const blockedTxt = getBlockedUsersText(conn.user.jid, groupId);

    txt += `\nNombre del grupo: ${groupName}\nID del grupo: ${groupId} [${participationStatus}${blockedTxt}]\n\n`;
  }

  conn.reply(m.chat, txt.trim(), m);
};

const getBlockedUsersText = (botId, groupId) => {
  let blockedTxt = '';

  if (global.db.data.blockedUsers) {
    const blockedUsers = global.db.data.blockedUsers[botId];
    const blockedUsersInGroup = blockedUsers?.filter(user => user.endsWith('@g.us') && groupId && groupId.includes(user));

    if (blockedUsersInGroup && blockedUsersInGroup.length > 0) {
      blockedTxt = `, Bloqueados: ${blockedUsersInGroup.map(user => `@${user.split('@')[0]}`).join(', ')}`;
    }
  }

  return blockedTxt;
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
