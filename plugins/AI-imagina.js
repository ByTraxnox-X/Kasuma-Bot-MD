import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apivisionary}/api/imagine?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.message && data.message.aiImageData && data.message.aiImageData.length >= 2) {
      const imagenes = data.message.aiImageData.slice(0, 2).map((item) => item.images[0].url);

      imagenes.forEach((imagen, index) => {
        conn.sendFile(m.chat, imagen, `imagen.png`, ``, m);
      });
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['imagina'];
handler.tags = ['ai'];
handler.command = /^imagina$/i;

export default handler;
