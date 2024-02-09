let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let duration = args[0]?.match(/(\d+)([mh])/);
  if (!duration) {
    m.reply('*FORMATO ERRONEO!!*\n\n*Ejemplo de uso:* *' + usedPrefix + command + ' 30*\n*Para cerrar el grupo durante 30 minutos.*');
    throw false;
  }

  let timeoutset = duration[2] === 'h' ? 3600000 * duration[1] : 60000 * duration[1];
  await conn.groupSettingUpdate(m.chat, 'announcement').catch(() => {});
  m.reply(`*Grupo cerrado durante ${duration[1]} ${duration[2] === 'h' ? 'hora(s)' : 'minuto(s)')}*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'not_announcement').catch(() => {});
    conn.reply(m.chat, '*El grupo se ha abierto, ahora todos los miembros pueden enviar mensajes!*');
  }, timeoutset);
};

handler.help = ['cerrargrupoen <minutos>'];
handler.tags = ['group'];
handler.command = /^(cerrargrupoen)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;
