import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vihangayt.me/tools/genwebsite?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data && data.data.extra_info && data.data.extra_info.html) {
      const codigoHtml = data.data.extra_info.html;
      conn.sendFile(m.chat, Buffer.from(codigoHtml), 'website.html', '', m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error`;
  }
};

handler.help = ['aiwebsite'];
handler.tags = ['ai'];
handler.command = /^aiwebsite$/i;

export default handler;
