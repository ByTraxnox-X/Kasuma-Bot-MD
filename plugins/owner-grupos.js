const handler = async (m, {conn}) => {
  let txt = '';
  for (const [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) 
    txt += `\n${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'No participa' : 'Parcitipa'}]\n\n`;
  m.reply(`Lista de grupos
${txt}
`.trim());
};
handler.help = ['listagrupos'];
handler.tags = ['owner'];
handler.command = /^(listagrupos)$/i;
handler.owner = true

export default handler;