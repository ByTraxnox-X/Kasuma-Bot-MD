import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (global.maintenance_mode) {
    return m.reply('El bot está actualmente en modo mantenimiento. Vuelve a intentarlo más tarde.');
  }
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a Bard.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/bard?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result) {
      m.reply(data.result);
    } else {
      throw 'No se pudo obtener una respuesta de la API.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['bard'];
handler.tags = ['ai'];
handler.command = /^bard$/i;

export default handler;
