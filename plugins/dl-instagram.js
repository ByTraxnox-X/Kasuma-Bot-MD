import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  try {
    const apiUrl = `${apikasu}/api/dowloader/instagram?url=${args[0]}&apikey=${apikeykasu}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      conn.sendFile(m.chat, data.url, 'arc_do', 'Descripción');
    } else {
      conn.reply(m.chat, 'Error al descargar el archivo de Instagram', m);
    }
  } catch (error) {
    conn.reply(m.chat, 'Ocurrió un error al procesar la solicitud', m);
  }
};

handler.help = ['instagram'];
handler.tags = ['dl'];
handler.command = /^(instagramdl|instagram|igdl|ig)$/i;

export default handler;
