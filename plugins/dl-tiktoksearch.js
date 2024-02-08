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

    if (data.status && data.result && data.result.length > 0) {
      const results = data.result;
      let message = 'Resultados de la búsqueda en TikTok:\n\n';

      results.forEach((result, index) => {
        const title = result.title || 'Sin título';
        const duration = result.duration || 'Desconocida';

        message += `Resultado ${index + 1}:\n`;
        message += `**Nombre video:** ${title}\n`;
        message += `**Duración:** ${duration} segundos\n\n`;
      });

      conn.sendMessage(m.chat, message, m);
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
