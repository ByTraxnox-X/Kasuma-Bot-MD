const handler = async (m, { conn }) => {
  try {
    const blockedUsers = await conn.fetchBlocklist();
    let txt = `*Lista de bloqueados*\n\n*Total :* ${blockedUsers.length}\n\n\n`;

    const fetchGroupNames = async (user) => {
      try {
        const chat = await conn.getChatById(user);
        return chat ? chat.name : 'Unknown Group';
      } catch (error) {
        console.error(error);
        return 'Unknown Group';
      }
    };

    const groupNamesPromises = blockedUsers.map(async (user) => {
      const groupName = await fetchGroupNames(user);
      return `@${user.split("@")[0]} en ${groupName}`;
    });

    const groupNames = await Promise.all(groupNamesPromises);
    txt += groupNames.join('\n');

    conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  } catch (error) {
    console.error(error);
    throw 'No hay números bloqueados';
  }
};

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
