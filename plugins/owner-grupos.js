import fs from 'fs';

const isUserBlockedInGroup = (userId, groupName) => {
  return (
    global.db.data.blockedUsers &&
    global.db.data.blockedUsers[userId] &&
    global.db.data.blockedUsers[userId].includes(groupName)
  );
};

const handler = async (m, { conn }) => {
  let txt = `ESTOY EN ESTOS GRUPOS ✅\n`;

  // Obtener la lista de grupos
  const groups = Object.values(await conn.groupFetchAllParticipating());

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const groupId = group.id;
    const groupName = group.subject || groupId;

    // Verificar si el bot está en el grupo
    if (group.participants.find(p => p.jid === conn.user.jid)) {
      txt += `\n*GRUPO*: ${groupName}\n*ID:* ${groupId}\n`;

      // Verificar y mostrar usuarios bloqueados en este grupo
      if (global.db.data.blockedUsers) {
        const blockedUsers = global.db.data.blockedUsers[conn.user.jid];
        if (blockedUsers && blockedUsers.includes(groupId)) {
          txt += `  - @${conn.user.jid.split('@')[0]}\n`;
        }
      }
    }
  }

  conn.reply(m.chat, txt.trim(), m);
};

handler.help = ['grouplist'];
handler.tags = ['info'];
handler.command = /^(grouplist)$/i;
handler.rowner = true;
handler.exp = 30;

export default handler;
