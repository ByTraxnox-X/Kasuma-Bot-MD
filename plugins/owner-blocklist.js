const handler = async (m, { conn }) => {
  try {
    const blockedUsers = await conn.fetchBlocklist();
    let txt = `*Lista de bloqueados*\n\n*Total :* ${blockedUsers.length}\n\n\n`;

    const fetchGroupNames = async (user) => {
      try {
        const chat = await conn.getChat(user);
        return chat ? chat.name : 'Unknown Group';
      } catch (error) {
        console.error(error);
        return 'Unknown Group';
      }
    };

    const updateDatabase = () => {
      fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8');
    };

    const unblockUser = async (user) => {
      const groupName = await fetchGroupNames(user);
      await conn.updateBlockStatus(user, 'unblock').then(() => {
        // Eliminar la información del grupo de la base de datos solo si es un grupo
        if (global.db.data.blockedUsers && global.db.data.blockedUsers[user]) {
          const index = global.db.data.blockedUsers[user].indexOf(groupName);
          if (index !== -1) {
            global.db.data.blockedUsers[user].splice(index, 1);
            if (global.db.data.blockedUsers[user].length === 0) delete global.db.data.blockedUsers[user];
            updateDatabase();
          }
        }
      });
    };

    const groupNamesPromises = blockedUsers.map(async (user) => {
      const groupName = await fetchGroupNames(user);
      return `@${user.split("@")[0]} en ${groupName}`;
    });

    const groupNames = await Promise.all(groupNamesPromises);
    txt += groupNames.join('\n');

    txt += "";
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
