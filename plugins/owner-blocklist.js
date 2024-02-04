const handler = async (m, { conn }) => {
  try {
    const data = await conn.fetchBlocklist();
    let txt = `*Lista de bloqueados*\n\n*Total :* ${data.length}\n\n\n`;

    for (let i of data) {
      let blockedUser = global.db.data.blockedUsers && global.db.data.blockedUsers[i] ? global.db.data.blockedUsers[i] : [];
      let uniqueGroups = [...new Set(blockedUser)]; // Eliminar duplicados
      let groupNames = await Promise.all(uniqueGroups.map(groupId => conn.getName(groupId)));
      txt += `@${i.split("@")[0]} - grupos: ${groupNames.join(', ')}\n`;
    }

    // Mostrar todos los usuarios bloqueados, incluso si no tienen información de grupo
    let allBlockedUsers = Object.keys(global.db.data.blockedUsers || {});
    allBlockedUsers = allBlockedUsers.filter(user => !data.includes(user)); // Filtrar para mostrar solo los nuevos bloqueados
    if (allBlockedUsers.length > 0) {
      txt += `\n*Usuarios bloqueados sin información de grupo:*\n`;
      for (let user of allBlockedUsers) {
        txt += `@${user.split("@")[0]}\n`;
      }
    }

    conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  } catch (err) {
    console.log(err);
    throw 'Error al obtener la lista de bloqueados';
  }
};

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
