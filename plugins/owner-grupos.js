import fs from 'fs';

const handler = async (m, { conn }) => {
  const groups = Object.values(await conn.groupFetchAllParticipating());
  const blockedUsers = global.db.data.blockedUsers?.[conn.user.jid];
  let txt = 'Lista de grupos\n';

  for (const group of groups) {
    const groupName = group.subject || group.id;
    const groupId = group.id;

    txt += `\nNombre del grupo: ${groupName}\nID del grupo: ${groupId}`;

    const blockedTxt = isUserBlockedInGroup(conn.user.jid, groupId, blockedUsers)
      ? `, Bloqueados: @${conn.user.jid.split('@')[0]}`
      : '';
    
    txt += `${blockedTxt}\n\n`;
  }

  const allBlockedUsersTxt = getAllBlockedUsersText(conn.user.jid, blockedUsers);
  if (allBlockedUsersTxt) {
    txt += `\nUsuarios bloqueados en todos los grupos: ${allBlockedUsersTxt}\n\n`;
  }

  conn.reply(m.chat, txt.trim(), m);
};

const isUserBlockedInGroup = (botId, groupId, blockedUsers) => {
  return blockedUsers && blockedUsers.includes(`${botId}@g.us:${groupId}`);
};

const getAllBlockedUsersText = (botId, blockedUsers) => {
  return blockedUsers && blockedUsers.length > 0
    ? blockedUsers.map(user => `@${user.split('@')[0]}`).join(', ')
    : '';
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
