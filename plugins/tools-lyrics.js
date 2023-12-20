import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a la API.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apivisionary}/api/lyrics?text=${text}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.resultado) {
      const { titulo, artista, imagen, letra } = data.resultado;
      const mensaje = `*${titulo} - ${artista}*\n${letra}`;
      conn.sendFile(m.chat, imagen, 'imagen.png', mensaje, m);
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
