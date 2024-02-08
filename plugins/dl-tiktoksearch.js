import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para la búsqueda en TikTok';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://apikasu.onrender.com/api/search/tiktoksearch?text=${encodeURIComponent(text)}&apikey=GuillermoDevelop`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result.length > 0) {
      const result = data.result[0];
      const title = result.title;
      const cover = result.cover;
      const playUrl = result.play;

      const message = `**Título:** ${title}\n**Cover:** ${cover}`;

      conn.sendFile(m.chat, cover, 'cover.jpg', message, m);
      conn.sendMessage(m.chat, `**Enlace del Video:** ${playUrl}`, m);
    } else {
      throw 'No se encontraron resultados para la búsqueda en TikTok';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['tiktoksearch'];
handler.tags = ['tiktok'];
handler.command = /^tiktoksearch$/i;

export default handler;
