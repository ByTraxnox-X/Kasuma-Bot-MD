import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://api-sebastian.zipponodes.xyz/api/imagine?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data && data.data.aiImageData && data.data.aiImageData.length > 0) {
      const primeraImagen = data.data.aiImageData[0].images[0].url;
      conn.sendFile(m.chat, primeraImagen, 'imagen.png', '', m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error`;
  }
};

handler.help = ['imagina'];
handler.tags = ['ai'];
handler.command = /^imagina$/i;

export default handler;
