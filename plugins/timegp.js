let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (args[0] === undefined || isNaN(args[0])) {
    m.reply('*FORMATO ERRONEO!!*\n\n*Ejemplo de uso:* *' + usedPrefix + command + ' 1*\n*Para cerrar el grupo durante una hora.*');
    throw false;
  }

  let timeoutset = 86400000 * args[0] / 24;
  await conn.groupSettingUpdate(m.chat, 'not_announcement').catch(() => {});
  m.reply(`*Grupo abierto durante ${args[0]} horas*`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'announcement').catch(() => {});
    conn.reply(m.chat, '*El grupo se ha cerrado, ahora solo los administradores pueden enviar mensajes!*');
  }, timeoutset);
};

handler.help = ['abrirgrupoen <horas>'];
handler.tags = ['group'];
handler.command = /^(abrirgrupoen)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;
