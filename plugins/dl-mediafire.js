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
         let fileBuffer = await fetch(json.message.link).then(res => res.buffer());
         await conn.sendFile(m.chat, fileBuffer, json.message.name, fileInfo, m);
      } else {
         m.reply('No se pudo obtener el enlace del archivo');
      }

   } catch (error) {
      console.error(error);
   }
};

handler.help = ['mediafire'];
handler.tags = ['dl'];
handler.command = /^(mediafire)$/i;

export default handler;
