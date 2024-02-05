let handler = async (m, { conn }) => {
  const blockedUsers = await conn.fetchBlocklist();
  let txt = `*Lista de bloqueados*\n\n*Total :* ${blockedUsers.length}\n\n\n`;

  for (let user of blockedUsers) {
    const group = conn.chats.get(user);
    const groupName = group ? group.name : 'Unknown Group';
    txt += `@${user.split("@")[0]} en ${groupName}\n`;
  }

  txt += "";
  return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
