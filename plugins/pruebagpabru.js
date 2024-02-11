const handler = async (m, { conn, text }) => {
  const params = text.split('|').map(param => param.trim());
  
  if (params.length !== 3) {
    return conn.reply(m.chat, 'Por favor, proporciona los parámetros correctos.', m);
  }

  const action = params[0].toLowerCase();
  const hours = params[1].toUpperCase();
  const dayOfWeek = parseInt(params[2]);

  if (!['abrir', 'cerrar'].includes(action) || !/^([1-9]|1[0-2]PM)$/.test(hours) || isNaN(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > 7) {
    return conn.reply(m.chat, 'Formato de comando incorrecto. Ejemplo válido: ".programar abrir 2PM|3PM|1".', m);
  }

  const hour = parseInt(hours);
  const isPM = hour === 12 || (hour >= 1 && hour <= 11);
  const currentDay = new Date().getDay();

  // Calcular el tiempo en milisegundos hasta el próximo evento programado
  const millisUntilNextEvent = calculateMillisUntilNextEvent(dayOfWeek, hour, isPM, currentDay);

  // Programar la ejecución de la acción en el tiempo calculado
  setTimeout(async () => {
    if (action === 'abrir') {
      await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, true);
      await conn.reply(m.chat, 'Grupo abierto automáticamente.', m);
    } else if (action === 'cerrar') {
      await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, false);
      await conn.reply(m.chat, 'Grupo cerrado automáticamente.', m);
    }
  }, millisUntilNextEvent);

  await conn.reply(m.chat, `Grupo programado para ${action === 'abrir' ? 'abrir' : 'cerrar'} a las ${hours} los días ${dayOfWeek}.`, m);
};


// Función para calcular el tiempo hasta el próximo evento programado
const calculateMillisUntilNextEvent = (desiredDay, desiredHour, isPM, currentDay) => {
  let millisUntilNextEvent = 0;
  const daysInWeek = 7;
  const millisecondsInHour = 3600000;

  if (currentDay === desiredDay && isCurrentTimeBefore(desiredHour, isPM)) {
    // El evento está programado para el mismo día y antes de la hora actual
    millisUntilNextEvent = calculateMillisUntilNextHour(desiredHour, isPM);
  } else {
    // Calcular días restantes hasta el próximo evento
    let daysUntilNextEvent = (desiredDay - currentDay + daysInWeek) % daysInWeek;
    if (daysUntilNextEvent === 0 && isCurrentTimeAfter(desiredHour, isPM)) {
      daysUntilNextEvent = daysInWeek; // Si es el mismo día pero después de la hora deseada, programar para la próxima semana
    }

    millisUntilNextEvent = daysUntilNextEvent * millisecondsInHour * 24 + calculateMillisUntilNextHour(desiredHour, isPM);
  }

  return millisUntilNextEvent;
};

// Función para calcular el tiempo hasta la próxima hora deseada en milisegundos
const calculateMillisUntilNextHour = (desiredHour, isPM) => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const desiredTime = (desiredHour + (isPM ? 12 : 0)) * 60; // Convertir a minutos

  let millisUntilNextHour = 0;

  if (currentTimeInMinutes() < desiredTime) {
    millisUntilNextHour = (desiredTime - currentTimeInMinutes()) * 60000 - currentMinute * 60000;
  } else {
    millisUntilNextHour = (24 * 60 - currentTimeInMinutes() + desiredTime) * 60000 - currentMinute * 60000;
  }

  return millisUntilNextHour;
};

// Función para verificar si la hora actual es antes de la hora deseada
const isCurrentTimeBefore = (desiredHour, isPM) => {
  const currentHour = new Date().getHours();
  return currentTimeInMinutes() < (desiredHour + (isPM ? 12 : 0)) * 60;
};

// Función para verificar si la hora actual es después de la hora deseada
const isCurrentTimeAfter = (desiredHour, isPM) => {
  const currentHour = new Date().getHours();
  return currentTimeInMinutes() >= (desiredHour + (isPM ? 12 : 0)) * 60;
};

// Función para obtener la hora actual en minutos
const currentTimeInMinutes = () => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  return currentHour * 60 + currentMinute;
};

handler.help = ['programar'];
handler.tags = ['ai'];
handler.command = /^programar$/i;

export default handler;
