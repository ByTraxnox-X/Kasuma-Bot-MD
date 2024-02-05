import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command }) => {
  const why = `Uso correcto\n${usedPrefix + command} @usuario`;
  const mentionedJid = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);

  if (!mentionedJid) {
    return conn.reply(m.chat, why, m, { mentions: [m.sender] });
  }

  try {
    const chat = await conn.getChat(mentionedJid);
    const groupName = chat ? chat.name : 'Unknown Group';

    switch (command) {
      case 'block':
        await conn.updateBlockStatus(mentionedJid, 'block').then(() => {
          if (groupName) {
            saveGroupInfo(mentionedJid, groupName);
          }
        });
        conn.reply(m.chat, `Usuario @${mentionedJid.split('@')[0]} bloqueado en el grupo ${groupName}`, m, { mentions: [mentionedJid] });
        break;

      case 'unblock':
        await conn.updateBlockStatus(mentionedJid, 'unblock').then(() => {
          if (groupName) {
            removeGroupInfo(mentionedJid, groupName);
          }
        });
        conn.reply(m.chat, `Usuario @${mentionedJid.split('@')[0]} desbloqueado en el grupo ${groupName}`, m, { mentions: [mentionedJid] });
        break;
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error al obtener información del grupo.`, m);
  }
};

const saveGroupInfo = (userId, groupName) => {
  global.db.data.blockedUsers = global.db.data.blockedUsers || {};
  global.db.data.blockedUsers[userId] = global.db.data.blockedUsers[userId] || [];
  if (!global.db.data.blockedUsers[userId].includes(groupName)) {
    global.db.data.blockedUsers[userId].push(groupName);
    saveDatabase();
  }
};

const removeGroupInfo = (userId, groupName) => {
  if (global.db.data.blockedUsers && global.db.data.blockedUsers[userId]) {
    const index = global.db.data.blockedUsers[userId].indexOf(groupName);
    if (index !== -1) {
      global.db.data.blockedUsers[userId].splice(index, 1);
      if (global.db.data.blockedUsers[userId].length === 0) delete global.db.data.blockedUsers[userId];
      saveDatabase();
    }
  }
};

const saveDatabase = () => {
  fs.writeFileSync('./lib/databasepro.json', JSON.stringify(global.db.data, null, 2), 'utf-8');
};

handler.help = ['block/unblock (@usuario)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock)$/i;
handler.rowner = true;

export default handler;
