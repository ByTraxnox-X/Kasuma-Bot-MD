import axios from 'axios';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw 'Ingrese el nombre del APK';

  try {
    m.react(rwait);

    const apiUrl = `${apikasu}/api/dowloader/apk?apk=${text}&apikey=${apikeykasu}`;
    const response = await axios.get(apiUrl);
    const data = response.data.result;

    let responseText = `\n\n*${data.apk_name}*\n\n`;
    responseText += `*Version:* ${data.apk_version}\n`;
    responseText += `*Autor:* ${data.apk_author}\n`;

    await conn.sendMessage(m.chat, { image: { url: data.apk_icon }, caption: responseText }, { quoted: m });


    const apkresponse = await fetch(apiUrl.apk_link);
    const apk = await apkresponse.buffer();

    await conn.sendFile(m.chat, apk, `${data.apk_name}.apk`, null, m);

  } catch (error) {
    console.error(error);
    throw 'Ocurrió un error al procesar la solicitud';
  }
};

handler.help = ['apk aplicacion'];
handler.tags = ['dl'];
handler.command = /^(apk|descargarapp|descargarapk)$/i;

export default handler;
