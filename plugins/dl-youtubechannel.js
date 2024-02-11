import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona el nombre del canal de YouTube.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/search/youtubechannel?channel=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result && data.result.length > 0) {
      const channel = data.result[0];

      let msg = `*Nombre del Canal:* ${channel.channel_name}\n`;
      msg += `*ID del Canal:* ${channel.channel_id}\n`;
      msg += `*Descripción:* ${channel.channel_about}\n`;
      msg += `*Fecha de Creación:* ${channel.channel_created}\n`;

      await conn.sendMessage(m.chat, { text: msg, image: { url: channel.channel_picture.medium.url } }, { quoted: m });
    } else {
      throw 'No se encontraron resultados para el canal de YouTube proporcionado.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['youtubechannel'];
handler.tags = ['search', 'youtube'];
handler.command = /^youtubechannel$/i;

export default handler;
