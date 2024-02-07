let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (args.length !== 3 || args[1].toLowerCase() !== 'auto') {
    m.reply(`Formato incorrecto. Uso: ${usedPrefix + command} auto <hora1|hora2>`);
    throw false;
  }

  let [start, end] = args[2].split('|');
  let now = new Date();
  let startTime = new Date(now.toDateString() + ' ' + start);
  let endTime = new Date(now.toDateString() + ' ' + end);
  let isTimeInRange = now >= startTime && now < endTime;

  await conn.groupSettingUpdate(m.chat, isTimeInRange ? 'not_announcement' : 'announcement');
  m.reply(`Grupo ${isTimeInRange ? 'abierto' : 'cerrado'} automáticamente. Próximo evento de ${start} a ${end}`);
};

handler.help = ['grouptime auto <hora1|hora2>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
