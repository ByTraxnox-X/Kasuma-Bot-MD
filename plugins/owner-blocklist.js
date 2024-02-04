let handler = async (m, { conn }) => {
  const blockedUserData = global.db.data.blockedUsers[m.sender] || { groups: [] };

  if (blockedUserData.groups.length === 0) {
    throw 'No hay usuarios bloqueados.';
  }

  let txt = `*Lista de usuarios bloqueados*\n\n`;
  
  for (let group of blockedUserData.groups) {
    txt += `Usuario: @${m.sender.split("@")[0]}\nGrupo: ${group.name} (@${group.jid.split("@")[0]})\n\n`;
  }

  return conn.reply(m.chat, txt, m, { mentions: [m.sender] });
}

handler.help = ['listblock'];
handler.tags = ['owner'];
handler.command = ['listblock'];

handler.rowner = true;

export default handler;
