let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let isClose = {
    'open': 'not_announcement',
    'buka': 'not_announcement',
    'on': 'not_announcement',
    '1': 'not_announcement',
    'close': 'announcement',
    'tutup': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[(args[0] || '')];

  if (isClose === undefined) {
    let caption = `
*FORMATO ERRONEO!!*
 
 ${usedPrefix + command} open 1*
 ${usedPrefix + command} close 1*
 *Ejemplo de uso:* *${usedPrefix + command} close 1* 
 Para que el grupo esté cerrado una hora.*

`;
    m.reply(caption);
    throw false;
  }

  let [start, end] = args[1].split('|');
  let [startHour, startMinute] = start.split(':').map(Number);
  let [endHour, endMinute] = end.split(':').map(Number);

  let now = new Date();
  let startTime = new Date(now.toDateString() + ' ' + start);
  let endTime = new Date(now.toDateString() + ' ' + end);
  let isTimeInRange = now >= startTime && now < endTime;

  await conn.groupSettingUpdate(m.chat, isTimeInRange ? 'not_announcement' : 'announcement');
  m.reply(`Grupo ${isTimeInRange ? 'abierto' : 'cerrado'} automáticamente. Próximo evento de ${start} a ${end}`);
};

handler.help = ['grouptime <open/close> <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
