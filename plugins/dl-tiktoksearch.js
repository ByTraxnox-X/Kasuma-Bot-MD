import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'Por favor, ingrese el término de búsqueda en TikTok';
  }

  try {
    const apiUrl = `${apivisionary}/api/tiktoksearch?text=${encodeURIComponent(args[0])}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.message && data.message.videos && data.message.videos.length >= 2) {
      const videos = data.message.videos;
      const selectedVideos = videos.slice(0, Math.ceil(videos.length / 2));

      let resultMessage = '';

      for (let i = 0; i < selectedVideos.length; i++) {
        const video = selectedVideos[i];

        const message = `*Título:* ${video.title}\n*Duración:* ${video.duration}s\n*URL:* ${video.play}\n\n`;
        resultMessage += message;
      }

      conn.sendMessage(m.chat, resultMessage, 'text', { quoted: m });
    } else {
      throw 'No se encontraron resultados de búsqueda en TikTok.';
    }
  } catch (error) {
    throw `Ocurrió un error al procesar la solicitud: ${error}`;
  }
};

handler.help = ['tiktoksearch'];
handler.tags = ['dl'];
handler.command = /^(tiktoksearch)$/i;

export default handler;
