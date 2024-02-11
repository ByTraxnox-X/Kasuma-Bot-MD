import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw 'Ingrese el nombre del APK';

  try {
    m.react(rwait);

    const apiUrl = `${apikasu}/api/dowloader/apk?apk=${text}&apikey=${apikeykasu}`;
    const response = await axios.get(apiUrl);
    const data = response.data.result;

    let responseText = `> Informacion\n\n*${data.apk_name}*\n\n`;
    responseText += `*Version:* ${data.apk_version}\n`;
    responseText += `*Autor:* ${data.apk_author}\n`;

    await conn.sendMessage(m.chat, { image: { url: data.apk_icon }, caption: responseText }, { quoted: m });

    const apkResponse = await fetch(data.apk_link);
    const apkBuffer = await apkResponse.buffer();

    await conn.sendFile(m.chat, apkBuffer, `${data.apk_name}.apk`, null, m);

  } catch (error) {
    console.error(error);
    throw '> Sin respuesta\nOcurrió un error al procesar la solicitud';
  }
};

handler.help = ['apk aplicacion'];
handler.tags = ['dl'];
handler.command = /^(apk|descargarapp|descargarapk)$/i;

export default handler;