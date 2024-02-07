let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (args.length !== 3 || args[1].toLowerCase() !== 'auto') {
    m.reply(`Formato incorrecto. Uso: ${usedPrefix + command} auto <hora_inicio|hora_fin>`);
    throw false;
  }

  let [startHour, startMinute] = args[2].split('|')[0].split(':').map(Number);
  let [endHour, endMinute] = args[2].split('|')[1].split(':').map(Number);

  let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  let startTime = startHour * 60 + startMinute;
  let endTime = endHour * 60 + endMinute;

  if (currentTime >= startTime && currentTime < endTime) {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply(`Grupo cerrado automáticamente. Próximo evento de ${args[2]}`);
  } else {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    m.reply(`Grupo abierto automáticamente. Próximo evento de ${args[2]}`);
  }
};

handler.help = ['grouptime auto <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
