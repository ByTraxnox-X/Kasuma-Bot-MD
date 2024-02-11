import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
   if (!text) throw 'Ingrese el enlace del archivo';

   try {
      const apiUrl = `${apikasu}/api/dowloader/googledrive?url=${text}&apikey=${apikeykasu}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
         throw new Error(`Error`);
      }
      const json = await res.json();
      m.react(rwait);

      if (json.status) {
         const fileInfo = `
> Informacion
*Nombre:* ${json.result.fileName}\n
*Tamaño:* ${json.result.fileSize}\n
*URL:* ${json.result.url}\n` +

         m.react(done);
         const fileBuffer = await fetch(json.result.url).then(res => res.buffer());
         await conn.sendFile(m.chat, fileBuffer, json.result.fileName, fileInfo, m);
      } else {
         m.reply(`
> Sin respuesta
No se pudo obtener el enlace del archivo`);
      }

   } catch (error) {
      console.error(error);
   }
};

handler.help = ['googledrive'];
handler.tags = ['dl'];
handler.command = /^(googledrive|gdrive)$/i;

export default handler;
