import fs from 'fs';

const handler = async (m, { conn }) => {
  try {
    const data = await conn.fetchBlocklist();

    if (data.length === 0) throw 'No hay números bloqueados';

    let txt = `*Lista de bloqueados*\n\n*Total :* ${data.length}\n\n`;

    for (let i of data) {
      const groupNames = global.db.data.blockedUsers && global.db.data.blockedUsers[i] ? global.db.data.blockedUsers[i].join(', ') : '';
      txt += `@${i.split("@")[0]} - grupos: ${groupNames}\n`;
    }

    conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  } catch (err) {
    console.error(err);
    throw 'Error al obtener la lista de bloqueados';
  }
};

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];
handler.rowner = true;

export default handler;
