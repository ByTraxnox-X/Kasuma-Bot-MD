let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (args.length !== 3 || args[1].toLowerCase() !== 'auto') {
    m.reply(`Formato incorrecto. Uso: ${usedPrefix + command} auto <hora_inicio|hora_fin>`);
    throw false;
  }

  let [start, end] = args[2].split('|');
  let [startHour, startMinute] = start.split(':').map(Number);
  let [endHour, endMinute] = end.split(':').map(Number);

  // Función para verificar si la hora actual está en el rango
  const isTimeInRange = () => {
    let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    let startTime = startHour * 60 + startMinute;
    let endTime = endHour * 60 + endMinute;
    return currentTime >= startTime && currentTime < endTime;
  };

  // Verificar y actualizar la configuración del grupo automáticamente
  const updateGroupSetting = async (isOpen) => {
    await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement');
    m.reply(`Grupo ${isOpen ? 'abierto' : 'cerrado'} automáticamente. Próximo evento de ${start} a ${end}`);
  };

  // Ejecutar la lógica
  if (isTimeInRange()) {
    await updateGroupSetting(true); // Grupo abierto
  } else {
    await updateGroupSetting(false); // Grupo cerrado
  }
};

handler.help = ['grouptime auto <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
