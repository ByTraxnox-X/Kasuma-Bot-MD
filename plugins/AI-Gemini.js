import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a Gemini.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/gemini?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result) {
      m.reply(`
> Gemini AI

${data.result}`);
    } else {
      throw `
> Sin respuesta

No se pudo obtener una respuesta de la API.`;
    }
  } catch (error) {
    throw `
> Sin respuesta

Ocurrió un error: ${error}`;
  }
};

handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = /^gemini$/i;

export default handler;
