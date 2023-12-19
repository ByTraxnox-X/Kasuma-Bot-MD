import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vihangayt.me/tools/aicode?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data && data.data.result) {
      const codigoGenerado = data.data.result;
      conn.reply(m.chat, `\`\`\`${codigoGenerado}\`\`\``, m);
    } else {
      throw 'No se pudo obtener una respuesta válida';
    }
  } catch (error) {
    throw `Ocurrió un error`;
  }
};

handler.help = ['aicode'];
handler.tags = ['ai'];
handler.command = /^aicode$/i;

export default handler;
