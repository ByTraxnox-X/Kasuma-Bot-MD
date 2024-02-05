const blockHandler = async (m, { conn, command }) => {
  const why = `Uso correcto\n.${command} @usuario`;
  const mentionedJid = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false);

  if (!mentionedJid) {
    return conn.reply(m.chat, why, m);
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

const listGroupsHandler = async (m, { conn }) => {
  let txt = '';
  for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) 
    txt += `\n${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'No participa' : 'Participa'}]\n\n`;
  
  m.reply(`Lista de grupos:\n${txt}`.trim());
};

const handler = (m, { conn, command }) => {
  if (command === 'block' || command === 'unblock') {
    blockHandler(m, { conn, command });
  } else if (command === 'listagrupos') {
    listGroupsHandler(m, { conn });
  }
};

handler.help = ['block/unblock (@usuario)', 'listagrupos'];
handler.tags = ['owner'];
handler.command = /^(block|unblock|listagrupos)$/i;
handler.rowner = true;

export default handler;
