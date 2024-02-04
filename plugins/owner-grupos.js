import fs from 'fs';

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

    conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  } catch (err) {
    console.log(err);
    throw 'No hay números bloqueados';
  }
};

handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true;

export default handler;
