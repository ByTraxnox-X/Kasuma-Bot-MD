let handler = async (m, { conn }) => {
  await conn.fetchBlocklist().then(async data => {
    let txt = `*Lista de bloqueados*\n\n*Total :* ${data.length}\n\n\n`;

    for (let i of data) {
      let blockedUser = global.db.data.blockedUsers && global.db.data.blockedUsers[i] ? global.db.data.blockedUsers[i] : [];
      let groupNames = await Promise.all(blockedUser.map(groupId => conn.getName(groupId)));
      txt += `@${i.split("@")[0]} - Bloqueado en los grupos: ${groupNames.join(', ')}\n`;
    }

    return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  }).catch(err => {
    console.log(err);
    throw 'No hay números bloqueados';
  });
}

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
