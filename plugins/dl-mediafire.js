import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ingrese el enlace del archivo';

  try {
    let res = await fetch(`${apivisionary}/api/mediafire?url=${encodeURIComponent(text)}`);

    if (!res.ok) {
      throw new Error(`Error`);
    }

    let json = await res.json();

    console.log('JSON response:', json);
    m.react(rwait);

    let fileInfo = 
      `*Nombre:* ${json.message.name}\n` +
      `*Tamaño:* ${json.message.size}\n` +
      `*Fecha:* ${json.message.date}\n` +
      `*Tipo:* ${json.message.mime}\n`;

    if (json.message.link) {
      m.react(done);
      await conn.sendFile(m.chat, json.message.link, json.message.name, fileInfo, m);
    } else {
      m.reply('No se pudo obtener el enlace del archivo');
    }

  } catch (error) {
    console.error(error);
  }
};

handler.help = ['descargar'];
handler.tags = ['dl'];
handler.command = /^(descargar)$/i;

export default handler;
