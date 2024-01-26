import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vihangayt.me/tools/aiimg?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data && data.data.aiImageData && data.data.aiImageData.length >= 2) {
      const imagenes = data.data.aiImageData.slice(0, 2).map((item) => item.images[0].url);

      imagenes.forEach((imagen, index) => {
        conn.sendFile(m.chat, imagen, `imagen_${index + 1}.png`, ``, m);
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
