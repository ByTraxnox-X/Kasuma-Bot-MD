import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${api}/api/llama?text=${encodeURIComponent(text)}${token}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.message) {
      const respuestaApi = data.message;

      conn.reply(m.chat, respuestaApi, m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['llama'];
handler.tags = ['ai'];
handler.command = /^llama$/i;

export default handler;
