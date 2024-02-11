import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/dalle?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;

    const response = await fetch(apiUrl);
    const buffer = await response.buffer();

    if (response.ok) {
      conn.sendFile(m.chat, buffer, 'imagen.jpg', '', m);
    } else {
      throw `
> Sin respuesta

No se pudo obtener una respuesta válida`;
    }
  } catch (error) {
    throw `
> Sin respuesta

Ocurrió un error: ${error}`;
  }
};

handler.help = ['dalle'];
handler.tags = ['ai'];
handler.command = /^dalle$/i;

export default handler;
