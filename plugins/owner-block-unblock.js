const handler = async (m, { text, conn, usedPrefix, command }) => {
  const why = `Uso correcto\n${usedPrefix + command} @${m.sender.split('@')[0]}`;
  const who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false);

  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });

  try {
    const chat = await conn.getChat(who);
    const groupName = chat ? chat.name : 'Unknown Group';

    switch (command) {
      case 'blok': case 'block':
        await conn.updateBlockStatus(who, 'block');
        conn.reply(m.chat, `Operación (${command}) completada en el grupo ${groupName}`, m);
        break;
      
      case 'unblok': case 'unblock':
        await conn.updateBlockStatus(who, 'unblock');
        conn.reply(m.chat, `Operación (${command}) completada en el grupo ${groupName}`, m);
        break;
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error al obtener información del grupo.`, m);
  }
};

handler.help = ['block/unblock (@user)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock)$/i;
handler.rowner = true;

export default handler;
