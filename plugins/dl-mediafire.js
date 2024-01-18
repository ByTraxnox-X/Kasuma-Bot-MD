import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
   if (!text) throw 'Ingrese el enlace del archivo';

   try {
      let res = await fetch(`https://vihangayt.me/download/mediafire?url=${text}`);

      if (!res.ok) {
         throw new Error(`Error`);
      }

      let json = await res.json();

      console.log('JSON response:', json);
      m.react(rwait);

      let fileInfo =
         `*Nombre:* ${json.data.name}\n` +
         `*Tamaño:* ${json.data.size}\n` +
         `*Fecha:* ${json.data.date}\n` +
         `*Tipo:* ${json.data.mime}\n`;

      if (json.data.link) {
         m.react(done);
         let fileBuffer = await fetch(json.data.link).then(res => res.buffer());
         await conn.sendFile(m.chat, fileBuffer, json.data.name, fileInfo, m);
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
