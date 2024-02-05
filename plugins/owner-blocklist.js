let handler = async (m, { conn }) => {
  const blockedUsers = await conn.fetchBlocklist();
  let txt = `*Lista de bloqueados*\n\n*Total :* ${blockedUsers.length}\n\n\n`;

  for (let user of blockedUsers) {
    try {
      const chat = await conn.getChat(user);
      const groupName = chat ? chat.name : 'Unknown Group';
      txt += `@${user.split("@")[0]} en ${groupName}\n`;
    } catch (error) {
      console.error(error);
    }
  }

  txt += "";
  return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
