const handler = async (m, {command, usedPrefix, text}) => {
  const M = m.constructor;
  const which = command.replace(/agregar/i, '');
  if (!m.quoted) throw 'responde a algo con un comando para agregarle';
  if (!text) throw `utliza ${usedPrefix}lista${which} para ver la lista de mensajes`;
  const msgs = global.db.data.msgs;
  if (text in msgs) throw `'${text}' se ha registrado`;
  msgs[text] = M.toObject(await m.getQuotedObj());
  m.reply(`agregado correctamente como '${text}'\nusa ${usedPrefix}ver${which} ${text} para acceder a el`);
};
handler.help = ['au', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'agregar' + v + ' command');
handler.tags = ['owner'];
handler.command = /^agregar(au|msg|video|audio|img|sticker)$/;
handler.owner = true

export default handler;
