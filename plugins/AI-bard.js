import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://apiruulzz.my.id/api/tools/gbard?query=${encodeURIComponent(text)}&apikey=dca5f647`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result) {
      const respuestaApi = data.result;
      const translatedText = await translate(respuestaApi, { to: 'es' });

      conn.reply(m.chat, translatedText.text, m);
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
