import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'Por favor, ingresa un enlace';
  }

  try {
    const apiUrl = `${apivisionary}/api/threads?url=${args[0]}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result.image_urls.length > 0) {
      for (const imageUrl of data.result.image_urls) {
        m.reply('Descargando imagen...');
        await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', '', m);
      }
    } else {
      throw 'No se pudo obtener el contenido de Threads.';
    }
  } catch (error) {
    throw `Ocurrió un error al procesar la solicitud: ${error}`;
  }
};

handler.help = ['threads'];
handler.tags = ['dl'];
handler.command = /^(threadsdl|threads)$/i;

export default handler;
