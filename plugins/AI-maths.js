import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apivisionary}/api/math?text=${text}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data) {

      const respuestaApi = data.data;

      conn.reply(m.chat, respuestaApi, m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['math'];
handler.tags = ['ai'];
handler.command = /^math$/i;

export default handler;
