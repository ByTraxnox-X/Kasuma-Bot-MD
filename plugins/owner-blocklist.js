// Código mejorado para la función ".listblock"
let handler = async (m, { conn }) => {
  await conn.fetchBlocklist().then(async data => {
    let txt = `*Lista de bloqueados*\n\n*Total :* ${data.length}\n\n\n`;

    for (let i of data) {
      let userBlockedInfo = global.db.data.blockedUsers[i.split('@')[0]];
      if (userBlockedInfo && userBlockedInfo.length > 0) {
        let groupInfo = userBlockedInfo.map(group => `${group.name} (@${group.jid.split('@')[0]})`).join(', ');
        txt += `@${i.split('@')[0]}\nBloqueado en: ${groupInfo}\n\n`;
      } else {
        txt += `@${i.split('@')[0]}\nBloqueado en: No se tiene información del grupo\n\n`;
      }
    }

    txt += "";
    return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
  }).catch(err => {
    console.log(err);
    throw 'No hay números bloqueados';
  })
}

handler.help = ['bloqueados'];
handler.tags = ['owner'];
handler.command = ['bloqueados', 'listblock'];

handler.rowner = true;

export default handler;
