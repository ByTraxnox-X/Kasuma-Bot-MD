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

  // Configurar el grupo automáticamente en la hora especificada
  const setGroupSettingAtTime = async (isOpen, time) => {
    await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement');
    m.reply(`Grupo ${isOpen ? 'abierto' : 'cerrado'} automáticamente. Próximo evento a las ${time}`);
  };

  // Ejecutar la lógica
  setGroupSettingAtTime(false, start);
  setInterval(() => setGroupSettingAtTime(true, start), 24 * 60 * 60 * 1000); // Configurar para abrir todos los días a la misma hora
};

handler.help = ['grouptime auto <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
