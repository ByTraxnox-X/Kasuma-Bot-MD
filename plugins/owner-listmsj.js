const handler = (m) => {
  const msgs = global.db.data.msgs;
  m.reply(`
LISTA DE GUARDADO

MENSAJES GUARDADOS
${Object.keys(msgs).map((v) => '' + v).join('\n')}
`.trim());
};
handler.help = ['au', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'lista' + v);
handler.tags = ['owner'];
handler.command = /^lista(au|msg|video|audio|img|sticker)$/;
handler.owner = true

export default handler;
