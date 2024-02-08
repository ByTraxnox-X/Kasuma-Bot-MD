import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/search/googleimg?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok && data.status && data.result && data.result.length >= 2) {
      const [firstImage, secondImage] = data.result.slice(0, 2);
      
      const firstImageResponse = await fetch(firstImage);
      const firstImageBuffer = await firstImageResponse.buffer();

      const secondImageResponse = await fetch(secondImage);
      const secondImageBuffer = await secondImageResponse.buffer();

      conn.sendFile(m.chat, firstImageBuffer, 'imagen1.jpg', '', m);
      conn.sendFile(m.chat, secondImageBuffer, 'imagen2.jpg', '', m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['imagen'];
handler.tags = ['ai'];
handler.command = ["image", "img", "imagen"]

export default handler;