import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
   if (!text) throw 'Ingrese el enlace del archivo';

   try {
      const apiUrl = `${apikasu}/api/dowloader/mediafire?url=${text}&apikey=${apikeykasu}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
         throw new Error(`Error`);
      }
      const json = await res.json();
      m.react(rwait);

      if (json.status) {
         const fileInfo = `*Nombre:* ${json.result.filename}\n` +
            `*Tamaño:* ${json.result.filesizeH}\n` +
            `*Fecha:* ${json.result.upload_date}\n` +
            `*Tipo:* ${json.result.filetype}\n`;

         m.react(done);
         const fileBuffer = await fetch(json.result.url).then(res => res.buffer());
         await conn.sendFile(m.chat, fileBuffer, json.result.filename, fileInfo, m);
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
