let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (args.length !== 4 || args[1].toLowerCase() !== 'auto') {
    m.reply(`Formato incorrecto. Uso: ${usedPrefix + command} auto <hora_inicio AM/PM>|<hora_fin AM/PM>`);
    throw false;
  }

  let [startHour, startMinute, startPeriod] = args[2].match(/(\d+):(\d+)([APMapm]{2})/).slice(1);
  let [endHour, endMinute, endPeriod] = args[3].match(/(\d+):(\d+)([APMapm]{2})/).slice(1);

  startHour = (startPeriod.toLowerCase() === 'pm' && startHour < 12) ? Number(startHour) + 12 : Number(startHour) % 12;
  endHour = (endPeriod.toLowerCase() === 'pm' && endHour < 12) ? Number(endHour) + 12 : Number(endHour) % 12;

  let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  let startTime = startHour * 60 + startMinute;
  let endTime = endHour * 60 + endMinute;

  if (currentTime >= startTime && currentTime < endTime) {
    await conn.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply(`Grupo cerrado automáticamente. Próximo evento de ${args[2]} a ${args[3]}`);
  } else {
    await conn.groupSettingUpdate(m.chat, 'announcement');
    m.reply(`Grupo abierto automáticamente. Próximo evento de ${args[2]} a ${args[3]}`);
  }
};

handler.help = ['grouptime auto <hora_inicio AM/PM>|<hora_fin AM/PM>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
