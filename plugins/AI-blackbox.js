import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://api-sebastian.zipponodes.xyz/api/blackbox?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.message) {
      const respuestaApi = data.message;
      conn.reply(m.chat, respuestaApi, m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error`;
  }
};

handler.help = ['aiblackbox'];
handler.tags = ['ai'];
handler.command = /^aiblackbox$/i;

export default handler;
