import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);


const apiUrl = `${apikasu}/api/tools/dalle?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data) {
      const url = data.data;
      conn.sendFile(m.chat, url, 'imagen.jpg', '', m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['dalle'];
handler.tags = ['ai'];
handler.command = /^dalle$/i;

export default handler;
