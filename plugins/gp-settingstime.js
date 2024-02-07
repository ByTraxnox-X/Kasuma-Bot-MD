let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
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
 Para que el grupo esté cerrado durante una hora.
`;

    m.reply(caption);
    throw false;
  }

  if (args[1] && args[1].toLowerCase() === 'auto') {
    // Cierre y apertura automática del grupo
    let [startHour, startMinute] = args[2].split(':').map(Number);
    let [endHour, endMinute] = args[3].split(':').map(Number);
    
    // Obtener el tiempo actual en milisegundos
    let currentTime = new Date().getTime();

    // Crear objetos de fecha para la hora de inicio y fin
    let startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    let endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    // Calcular el tiempo restante hasta la próxima apertura o cierre automático
    let timeUntilNextEvent = startTime > currentTime ? startTime - currentTime : endTime - currentTime;

    // Actualizar la configuración del grupo
    await conn.groupSettingUpdate(m.chat, isClose).then(async _=> {
      m.reply(` *Grupo ${isClose == 'announcement' ? 'cerrado' : 'abierto'} automáticamente. Próximo evento a las ${args[2]}-${args[3]}`);
    });

    setTimeout(async () => {
      // Cambiar el estado del grupo después del tiempo especificado
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=>{
        conn.reply(m.chat, `${isClose == 'not_announcement' ? '*El grupo ha sido cerrado, ahora solo los administradores pueden enviar mensajes!*' : '*El grupo se ha abierto, ahora todos los miembros pueden enviar mensajes!*'}!`);
      });
    }, timeUntilNextEvent);
  } else {
    // Cierre y apertura manual del grupo
    let timeoutset = 86400000 * args[1] / 24;

    await conn.groupSettingUpdate(m.chat, isClose).then(async _=> {
      m.reply(` *Grupo ${isClose == 'announcement' ? 'cerrado' : 'abierto'} ${args[1] ? `durante*${clockString(timeoutset)}*` : ''}`);
    });

    if (args[1]) {
      setTimeout(async () => {
        await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _=>{
          conn.reply(m.chat, `${isClose == 'not_announcement' ? '*El grupo ha sido cerrado, ahora solo los administradores pueden enviar mensajes!*' : '*El grupo se ha abierto, ahora todos los miembros pueden enviar mensajes!*'}!`);
        });
      }, timeoutset);
    }
  }
}

handler.help = ['grouptime <open/close> <horas/auto> <hora_inicio> <hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ms,h,m,s});
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
