const handler = async (m, {command, usedPrefix, text}) => {
  const which = command.replace(/eliminar/i, '');
  if (!text) throw `para ver la lista usa ${usedPrefix}lista${which}`;
  const msgs = global.db.data.msgs;
  if (!text in msgs) throw `'${text}' no encontrado`;
  delete msgs[text];
  m.reply(`se elimino con exito  '${text}'`);
};
handler.help = ['au', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'eliminar' + v + ' command');
handler.tags = ['owner'];
handler.command = /^eliminar(au|msg|video|audio|img|sticker)$/;
handler.owner = true

export default handler;
