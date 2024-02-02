import fs from 'fs'

const handler = async (m, { text, conn, usedPrefix, command }) => {
  const why = `Uso correcto\n${usedPrefix + command} @${m.sender.split('@')[0]}`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) conn.reply(m.chat, why, m, { mentions: [m.sender] });

  const res = [];

  switch (command) {
    case 'blok':
    case 'block':
      if (who) {
        await conn.updateBlockStatus(who, 'block').then(() => {
          res.push(who);
          // Guardar información en la base de datos
          global.db.data.blockedUsers = global.db.data.blockedUsers || {};
          global.db.data.blockedUsers[who] = global.db.data.blockedUsers[who] || [];
          global.db.data.blockedUsers[who].push(m.chat); // Guarda el ID del grupo en el que se bloqueó al usuario
          fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8'); // Guarda la base de datos de forma síncrona
        });
      } else conn.reply(m.chat, why, m, { mentions: [m.sender] });
      break;
    case 'unblok':
    case 'unblock':
      if (who) {
        await conn.updateBlockStatus(who, 'unblock').then(() => {
          res.push(who);
          // Elimina la información del grupo de la base de datos al desbloquear
          if (global.db.data.blockedUsers && global.db.data.blockedUsers[who]) {
            const index = global.db.data.blockedUsers[who].indexOf(m.chat);
            if (index !== -1) {
              global.db.data.blockedUsers[who].splice(index, 1);
              if (global.db.data.blockedUsers[who].length === 0) delete global.db.data.blockedUsers[who];
              fs.writeFileSync('./path/to/your/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8'); // Guarda la base de datos de forma síncrona
            }
          }
        });
      } else conn.reply(m.chat, why, m, { mentions: [m.sender] });
      break;
  }

  if (res[0]) conn.reply(m.chat, `*Se completó la operación (${command}) con ${res ? `${res.map((v) => '@' + v.split('@')[0])}` : ''}*`, m, { mentions: res });
};

handler.help = ['block/unblock (@user)']
handler.tags = ['owner']
handler.command = /^(block|unblock)$/i;
handler.rowner = true

export default handler;
