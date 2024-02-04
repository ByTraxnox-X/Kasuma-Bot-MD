import fs from 'fs';

const isUserBlockedInGroup = (userId, groupId) => {
  const blockedUsers = global.db.data.blockedUsers?.[userId];
  return blockedUsers && blockedUsers.includes(`${userId}@g.us:${groupId}`);
};

const handler = async (m, { conn, command }) => {
  const why = `Uso correcto\n${command} @usuario`;
  const who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });

  let res = [];
  let groupName = m.isGroup ? m.chat : null;

  switch (command) {
    case 'blok':
    case 'block':
      await conn.updateBlockStatus(who, 'block').then(() => {
        res.push(who);
        if (groupName) {
          global.db.data.blockedUsers = global.db.data.blockedUsers || {};
          global.db.data.blockedUsers[who] = global.db.data.blockedUsers[who] || [];
          if (!global.db.data.blockedUsers[who].includes(`${who}@g.us:${groupName}`)) {
            global.db.data.blockedUsers[who].push(`${who}@g.us:${groupName}`);
          }
          fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8');
        }
      });
      break;
  }

  if (res.length > 0) {
    let replyText = `*Operación (${command}) completada con ${res.map(v => '@' + v.split('@')[0]).join(', ')}*`;
    if (groupName) {
      replyText += `\nEn el grupo: ${groupName}`;
    }

    conn.reply(m.chat, replyText, m, { mentions: res });
  } else {
    conn.reply(m.chat, why, m, { mentions: [m.sender] });
  }
};

handler.help = ['block (@usuario)'];
handler.tags = ['owner'];
handler.command = /^(blok|block)$/i;
handler.rowner = true;

export default handler;
