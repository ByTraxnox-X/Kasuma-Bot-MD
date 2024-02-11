import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/imagine?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;

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
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['generaimagen'];
handler.tags = ['ai'];
handler.command = /^generaimagen$/i;

export default handler;
