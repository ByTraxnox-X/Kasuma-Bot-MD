let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  try {
    // Verificar si el usuario tiene permisos de administrador u propietario
    if (!(isAdmin || isOwner)) {
      // Puedes personalizar la función dfail según tus necesidades
      global.dfail('admin', m, conn);
      throw false;
    }

    // Verificar el formato correcto del comando
    if (args.length !== 3 || args[1].toLowerCase() !== 'auto') {
      m.reply(`Formato incorrecto. Uso: ${usedPrefix + command} auto <hora_inicio|hora_fin>`);
      throw false;
    }

    // Extraer horas de inicio y fin en formato específico
    let [start, end] = args[2].match(/\b\d{1,2}:\d{2}[APMapm]{2}\b/g) || [];
    if (!start || !end) {
      m.reply("Formato de hora incorrecto. Utiliza un formato como 8:30AM|9:30PM");
      throw false;
    }

    // Función para configurar automáticamente el grupo en la hora especificada
    const setGroupSettingAtTime = async (isOpen, time) => {
      // Puedes ajustar esto según tus necesidades
      // conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement');
      // m.reply(`Grupo ${isOpen ? 'abierto' : 'cerrado'} automáticamente. Próximo evento a las ${time}`);
    };

    // Ejecutar la lógica
    setGroupSettingAtTime(false, start); // Cerrar grupo
    setGroupSettingAtTime(true, start);  // Abrir grupo

  } catch (error) {
    console.error(error);
    // Manejar cualquier error aquí
  }
};

// Configuración del comando
handler.help = ['grouptime auto <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = /^(grouptime|gctime)$/i;

// Requisitos de permisos
handler.botAdmin = true;
handler.group = true;

// Exportar el manejador
module.exports = handler;
