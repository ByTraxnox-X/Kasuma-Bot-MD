import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw 'Ingrese el nombre del APK';

  try {
    m.react(rwait);

    const apiUrl = `${apikasu}/api/dowloader/apk?apk=${text}&apikey=${apikeykasu}`;
    const response = await axios.get(apiUrl);
    const data = response.data.result;

    let responseText = `
> Informacion

*Nombre:* ${data.name}\n\n
*Ultima Actualizacion:* ${data.lastup}\n
*Peso:* ${data.size}\n
*Paquete:* ${data.package}\n`

    await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: responseText }, { quoted: m });

    const apkResponse = await fetch(data.dllink);
    const apkBuffer = await apkResponse.buffer();

    await conn.sendFile(m.chat, apkBuffer, `${data.apk_name}.apk`, null, m);

  } catch (error) {
    console.error(error);
    throw `
> Sin respuesta

Ocurrió un error al procesar la solicitud`;
  }
};

handler.help = ['apk aplicacion'];
handler.tags = ['dl'];
handler.command = /^(apk|descargarapp|descargarapk)$/i;

export default handler;