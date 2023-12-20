const handler = async (m, {conn, command, usedPrefix, text}) => {
  const which = command.replace(/ver/i, '');
  if (!text) throw `usa ${usedPrefix}lista${which} para ver la lista`;
  const msgs = global.db.data.msgs;
  if (!text in msgs) throw `'${text}' no registrado`;
  const _m = await conn.serializeM(msgs[text]);
  await _m.copyNForward(m.chat, true);
};
handler.help = ['au', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'ver' + v + ' <text>');
handler.tags = ['owner'];
handler.command = /^ver(au|msg|video|audio|img|sticker)$/;
handler.owner = true

export default handler;
