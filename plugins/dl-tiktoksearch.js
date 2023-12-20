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
      const firstVideo = data.message.videos[0];
      const secondVideo = data.message.videos[1];

      m.reply(`Descargando el primer video...`);
      await conn.sendFile(m.chat, firstVideo.play, 'video1.mp4', `*Título:* ${firstVideo.title}\n*Duración:* ${firstVideo.duration}s`, m);


      m.reply(`Descargando el segundo video...`);
      await conn.sendFile(m.chat, secondVideo.play, 'video2.mp4', `*Título:* ${secondVideo.title}\n*Duración:* ${secondVideo.duration}s`, m);
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
