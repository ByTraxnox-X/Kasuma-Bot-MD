import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/bingimg?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const firstImageUrl = data.result[0];
    const imageResponse = await fetch(firstImageUrl);
    const buffer = await imageResponse.buffer();

    const fileName = "bingcreator_first_image.png";
    await conn.sendFile(m.chat, buffer, fileName, "", m);

    if (!response.ok) {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['bingcreator'];
handler.tags = ['ai'];
handler.command = /^bingcreator$/i;

export default handler;