const handler = async (m, { conn, command }) => {
  const mentionedJid = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);

  if (!mentionedJid) {
    return conn.reply(m.chat, `Uso correcto\n.${command} @usuario`, m);
  }

  try {
    const chat = await conn.getChat(mentionedJid);
    const groupName = chat ? chat.name : 'Unknown Group';

    switch (command) {
      case 'block':
        await conn.updateBlockStatus(mentionedJid, 'block');
        conn.reply(m.chat, `Usuario @${mentionedJid.split('@')[0]} bloqueado en el grupo ${groupName}`, m, { mentions: [mentionedJid] });
        break;

      case 'unblock':
        await conn.updateBlockStatus(mentionedJid, 'unblock');
        conn.reply(m.chat, `Usuario @${mentionedJid.split('@')[0]} desbloqueado en el grupo ${groupName}`, m, { mentions: [mentionedJid] });
        break;
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error al obtener información del grupo.`, m);
  }
};

handler.help = ['block/unblock (@usuario)'];
handler.tags = ['owner'];
handler.command = /^(block|unblock)$/i;
handler.rowner = true;

export default handler;
