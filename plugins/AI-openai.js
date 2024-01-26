import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a ChatGPT.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vihangayt.me/tools/chatgpt?q=${text}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.resultado) {
      m.reply(data.resultado);
    } else {
      throw 'No se pudo obtener una respuesta de la API.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['ai'];
handler.command = /^chatgpt$/i;

export default handler;
