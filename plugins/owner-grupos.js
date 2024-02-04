import fs from 'fs';

const handler = async (m, { conn }) => {
  const groups = Object.values(await conn.groupFetchAllParticipating());
  let txt = 'Lista de grupos\n';

  for (const group of groups) {
    const groupName = group.subject || group.id;
    const groupId = group.id;

    const blockedTxt = getBlockedUsersText(conn.user.jid, groupId);

    txt += `\nNombre del grupo: ${groupName}\nID del grupo: ${groupId}${blockedTxt}\n\n`;
  }

  const allBlockedUsersTxt = getAllBlockedUsersText(conn.user.jid);
  if (allBlockedUsersTxt) {
    txt += `\nUsuarios bloqueados en todos los grupos: ${allBlockedUsersTxt}\n\n`;
  }

  conn.reply(m.chat, txt.trim(), m);
};

const getBlockedUsersText = (botId, groupId) => {
  const blockedUsers = global.db.data.blockedUsers?.[botId];
  const blockedUsersInGroup = blockedUsers?.filter(user => user.endsWith('@g.us') && groupId && groupId.includes(user));
  return blockedUsersInGroup && blockedUsersInGroup.length > 0
    ? `, Bloqueados: ${blockedUsersInGroup.map(user => `@${user.split('@')[0]}`).join(', ')}`
    : '';
};

const getAllBlockedUsersText = (botId) => {
  const blockedUsers = global.db.data.blockedUsers?.[botId];
  return blockedUsers && blockedUsers.length > 0
    ? blockedUsers.map(user => `@${user.split('@')[0]}`).join(', ')
    : '';
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
