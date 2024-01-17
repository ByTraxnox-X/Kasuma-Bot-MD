import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ingrese el enlace del archivo';

  try {
    let res = await fetch(`${apivisionary}/api/mediafire?url=${encodeURIComponent(text)}`);

    if (!res.ok) {
      console.error('Error en la solicitud a la API:', res.status, res.statusText);
      throw new Error(`Error en la solicitud a la API`);
    }

    let json = await res.json();

    console.log('JSON response:', json);
    m.react('✅');

    if (json.status) {
      let fileInfo = 
        `*Nombre:* ${json.message.name}\n` +
        `*Tamaño:* ${json.message.size}\n` +
        `*Fecha:* ${json.message.date}\n` +
        `*Tipo:* ${json.message.mime}\n`;

      if (json.message.link) {
        m.reply(fileInfo);
        m.reply({ url: json.message.link });
      } else {
        m.reply('No se pudo obtener el enlace del archivo');
      }
    } else {
      m.reply('La API no devolvió un estado válido.');
    }

  } catch (error) {
    console.error('Error en el manejador:', error);
  }
};

handler.help = ['mediafire'];
handler.tags = ['dl'];
handler.command = /^(mediafire)$/i;

export default handler;
