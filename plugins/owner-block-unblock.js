import fs from 'fs';

const isUserBlockedInGroup = (userId, groupName) => {
  return (
    global.db.data.blockedUsers &&
    global.db.data.blockedUsers[userId] &&
    global.db.data.blockedUsers[userId].includes(groupName)
  );
};

const handler = async (m, { conn, command, __dirname }) => {
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
          if (!global.db.data.blockedUsers[who].includes(groupName)) {
            global.db.data.blockedUsers[who].push(groupName);
          }
          fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8');
        }
      });
      break;
    case 'unblok':
    case 'unblock':
      await conn.updateBlockStatus(who, 'unblock').then(() => {
        res.push(who);
        if (groupName) {
          if (global.db.data.blockedUsers && global.db.data.blockedUsers[who]) {
            const index = global.db.data.blockedUsers[who].indexOf(groupName);
            if (index !== -1) {
              global.db.data.blockedUsers[who].splice(index, 1);
              if (global.db.data.blockedUsers[who].length === 0) delete global.db.data.blockedUsers[who];
              fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8');
            }
          }
        }
      });
      break;
    case 'listgroup':
      let txt = `ESTOY EN ESTOS GRUPOS ✅\n`;
      for (const [jid, data] of chats) {
        if (jid && data.isChats) {
          txt += `\n*GRUPO*: ${data.name || jid}\n*ID:* ${jid}\n`;
        }
      }
      conn.reply(m.chat, txt.trim(), m);
      break;
    case 'checkblock':
      if (groupName) {
        if (isUserBlockedInGroup(who, groupName)) {
          res.push(who);
          conn.reply(m.chat, `@${who.split('@')[0]} está bloqueado en el grupo: ${groupName}`, m, { mentions: [who] });
        } else {
          conn.reply(m.chat, `@${who.split('@')[0]} no está bloqueado en el grupo: ${groupName}`, m, { mentions: [who] });
        }
      } else {
        conn.reply(m.chat, 'Este comando solo puede usarse en grupos', m);
      }
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

handler.help = ['block/unblock/checkblock (@usuario)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock|checkblock|listgroup)$/i;
handler.rowner = true;

export default handler;
