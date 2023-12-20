import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apivisionary}/api/bard?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result) {
      const respuestaApi = JSON.parse(data.result).result;

      conn.reply(m.chat, respuestaApi, m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['aibard'];
handler.tags = ['ai'];
handler.command = /^aibard$/i;

export default handler;
