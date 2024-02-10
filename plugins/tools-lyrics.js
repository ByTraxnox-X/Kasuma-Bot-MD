import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a la API.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/search/lyrics?text=${text}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.resultado) {
      const { title, artist, image, lyrics } = data.resultado;
      const mensaje = `*${title} - ${artist}*\n${lyrics}`;
      conn.sendFile(m.chat, image, 'image.png', mensaje, m);
    } else {
      throw 'No se pudo obtener una respuesta de la API.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['letra'];
handler.tags = ['tools'];
handler.command = /^letra$/i;

export default handler;
