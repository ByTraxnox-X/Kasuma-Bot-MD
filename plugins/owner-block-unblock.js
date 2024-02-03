import fs from 'fs';
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
          // Guardar información en la base de datos solo si es un grupo
          global.db.data.blockedUsers = global.db.data.blockedUsers || {};
          global.db.data.blockedUsers[who] = global.db.data.blockedUsers[who] || [];
          if (!global.db.data.blockedUsers[who].includes(groupName)) {
            global.db.data.blockedUsers[who].push(groupName); // Guarda el nombre del grupo
          }
          fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8'); // Guarda la base de datos de forma síncrona
        }
      });
      break;
    case 'unblok':
    case 'unblock':
      await conn.updateBlockStatus(who, 'unblock').then(() => {
        res.push(who);
        if (groupName) {
          // Eliminar la información del grupo de la base de datos solo si es un grupo
          if (global.db.data.blockedUsers && global.db.data.blockedUsers[who]) {
            const index = global.db.data.blockedUsers[who].indexOf(groupName);
            if (index !== -1) {
              global.db.data.blockedUsers[who].splice(index, 1);
              if (global.db.data.blockedUsers[who].length === 0) delete global.db.data.blockedUsers[who];
              fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8'); // Guarda la base de datos de forma síncrona
            }
          }
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

handler.help = ['block/unblock (@usuario)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock)$/i;
handler.rowner = true;

export default handler;
