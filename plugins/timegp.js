let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let duration = args[0]?.match(/(\d+)([mh])/);
  if (!duration) {
    m.reply('*FORMATO ERRONEO!!*\n\n*Ejemplo de uso:* *' + usedPrefix + command + ' m30*\n*Para abrir el grupo durante 30 minutos.*');
    throw false;
  }

  let timeoutset = duration[2] === 'h' ? 3600000 * duration[1] : 60000 * duration[1];
  await conn.groupSettingUpdate(m.chat, 'not_announcement').catch(() => {});
  m.reply(`*Grupo abierto durante ${duration[1]} ${duration[2] === 'h' ? 'hora(s)' : 'minuto(s)'}*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'announcement').catch(() => {});
    conn.reply(m.chat, '*El grupo se ha cerrado, ahora solo los administradores pueden enviar mensajes!*');
  }, timeoutset);
};

handler.help = ['abrirgrupoen <m/h>'];
handler.tags = ['group'];
handler.command = /^(abrirgrupoen)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;
