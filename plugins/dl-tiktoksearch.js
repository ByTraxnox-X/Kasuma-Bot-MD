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
      const selectedVideos = videos.slice(0, 10);

      let resultMessage = '';

      for (let i = 0; i < selectedVideos.length; i++) {
        const video = selectedVideos[i];

        const nickname = video.user ? video.user.nickname : 'N/A';
        const message = `*Nickname:* ${nickname}\n*Play Count:* ${video.play_count}\n*Comment Count:* ${video.comment_count}\n*Share Count:* ${video.share_count}\n\n`;
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
