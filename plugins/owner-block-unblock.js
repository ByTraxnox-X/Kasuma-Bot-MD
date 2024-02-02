const handler = async (m, { conn, command }) => {
  const why = `Uso correcto\n${command} @usuario`;
  const who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });

  let res = [];
  let groupName;

  switch (command) {
    case 'blok':
    case 'block':
      await conn.updateBlockStatus(who, 'block').then(() => {
        res.push(who);
        groupName = m.isGroup ? m.chat : null;
      });
      break;
    case 'unblok':
    case 'unblock':
      await conn.updateBlockStatus(who, 'unblock').then(() => {
        res.push(who);
        groupName = m.isGroup ? m.chat : null;
      });
      break;
  }

  if (res.length > 0) {
    let replyText = `*Operación (${command}) completada con ${res.map(v => '@' + v.split('@')[0]).join(', ')}*`;
    if (groupName) {
      const group = await conn.getName(groupName);
      replyText += `\nEn el grupo: ${group}`;
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
