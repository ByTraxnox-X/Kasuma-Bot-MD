const handler = async (m, {text, conn, usedPrefix, command}) => {
  const why = `uso correcto\n${usedPrefix + command} @${m.sender.split('@')[0]}`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;

  if (!who) conn.reply(m.chat, why, m, {mentions: [m.sender]});
  const res = [];

  switch (command) {
    case 'blok': case 'block':
      if (who) {
        try {
          const chat = await conn.getChat(who);
          const groupName = chat ? chat.name : 'Unknown Group';
          await conn.updateBlockStatus(who, 'block').then(() => {
            res.push(who);
          });
          conn.reply(m.chat, `*se completo la operacion (${command}) en el grupo ${groupName} con ${res ? `${res.map((v) => '@' + v.split('@')[0])}` : ''}*`, m, {mentions: res});
        } catch (error) {
          console.error(error);
          conn.reply(m.chat, `Error al obtener información del grupo.`, m);
        }
      } else conn.reply(m.chat, why, m, {mentions: [m.sender]});
      break;
    case 'unblok': case 'unblock':
      if (who) {
        try {
          const groupName = m.chat ? conn.chats.get(m.chat)?.name : 'Unknown Group';
          await conn.updateBlockStatus(who, 'unblock').then(() => {
            res.push(who);
          });
          conn.reply(m.chat, `*se completo la operacion (${command}) en el grupo ${groupName} con ${res ? `${res.map((v) => '@' + v.split('@')[0])}` : ''}*`, m, {mentions: res});
        } catch (error) {
          console.error(error);
          conn.reply(m.chat, `Error al obtener información del grupo.`, m);
        }
      } else conn.reply(m.chat, why, m, {mentions: [m.sender]});
      break;
  }
};

handler.help = ['block/unblock (@user)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock)$/i;
handler.rowner = true;

export default handler;
