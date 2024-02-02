import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a ChatGPT.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vanitas.website/api/chatgpt?text=${text}&apikey=Vanitas`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.response) {
      m.reply(data.response);
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
