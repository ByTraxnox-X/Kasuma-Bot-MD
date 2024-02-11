const handler = async (m, { conn, text }) => {
  const times = text.split('|').map(time => time.trim());

  if (times.length !== 2) {
    return conn.reply(m.chat, 'Por favor, proporciona dos horas separadas por "|".', m);
  }

  try {
    const openTime = parseTime(times[0]);
    const closeTime = parseTime(times[1]);

    scheduleAction(conn, m, 'abrir', openTime);
    scheduleAction(conn, m, 'cerrar', closeTime);

    return conn.reply(m.chat, `Grupo programado para abrir a las ${openTime} y cerrar a las ${closeTime}.`, m);
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, 'Ocurrió un error al programar las acciones.', m);
  }
};

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(part => parseInt(part));
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Formato de hora incorrecto.');
  }
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const scheduleAction = (conn, m, action, time) => {
  const [hours, minutes] = time.split(':').map(part => parseInt(part));
  const now = new Date();
  const scheduleTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (scheduleTime < now) {
    scheduleTime.setDate(now.getDate() + 1);
  }

  const millisUntilNextEvent = scheduleTime - now;

  setTimeout(async () => {
    await performAction(conn, m, action);
    await conn.reply(m.chat, `Grupo ${action === 'abrir' ? 'abierto' : 'cerrado'} automáticamente.`, m);
    scheduleAction(conn, m, action, time); // Programar la próxima acción
  }, millisUntilNextEvent);
};

const performAction = async (conn, m, action) => {
  try {
    if (action === 'abrir') {
      await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, true);
    } else if (action === 'cerrar') {
      await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, false);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al realizar la acción en el grupo.');
  }
};

handler.help = ['programar'];
handler.tags = ['ai'];
handler.command = /^programar auto/i;

export default handler;
