let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
      throw false
    }

    if (!args[0]) {
      m.reply(`No hay suficientes argumentos. Ejemplo de uso: ${usedPrefix + command} 6AM|7AM|7`);
      throw false;
    }

    let [horaApertura, horaCierre, dias] = args[0].split('|').map(e => e.trim());

    if (!horaApertura || !horaCierre || !dias || isNaN(dias)) {
      m.reply(`Formato incorrecto. Ejemplo de uso: ${usedPrefix + command} 6AM|7AM|7`);
      throw false;
    }

    let horaApertura24 = obtenerFormato24Horas(horaApertura);
    let horaCierre24 = obtenerFormato24Horas(horaCierre);
    let tiempoEstablecido = dias * 24 * 60 * 60 * 1000; 

    await conn.groupSettingUpdate(m.chat, 'not_announcement').then(async _ => {
      m.reply(`Grupo Abierto desde las ${horaApertura24} hasta las ${horaCierre24} durante ${dias} días.`);
    });

    if (tiempoEstablecido > 0) {
      setTimeout(async () => {
        await conn.groupSettingUpdate(m.chat, 'not_announcement').then(async _ => {
          m.reply(`Grupo Cerrado desde las ${horaCierre24} hasta las ${horaApertura24} durante ${dias} días.`);
        });
      }, tiempoEstablecido);
    }
  };

  handler.help = ['programar 6AM|7AM|7'];
  handler.tags = ['group'];
  handler.command = /^programar$/i;
  handler.botAdmin = true;
  handler.group = true;

  export default handler;

  function obtenerFormato24Horas(hora) {
    let [horaNum, ampm] = hora.match(/(\d+)([APMapm]{2})/).slice(1);
    horaNum = parseInt(horaNum);
    if (ampm.toUpperCase() === 'PM' && horaNum !== 12) {
      horaNum += 12;
    } else if (ampm.toUpperCase() === 'AM' && horaNum === 12) {
      horaNum = 0;
    }
    return horaNum.toString().padStart(2, '0') + ':00';
  }