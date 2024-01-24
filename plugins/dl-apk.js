import axios from 'axios';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw `Ingrese el nombre del APK`;

  try {
    m.react(rwait);

    const response = await axios.get(`${apivisionary}/api/apk?id=${text}`);
    const data = response.data.data;

    let responseText = `\n\n*${data.name}*\n\n`;
    responseText += `*Package:* ${data.package}\n`;
    responseText += `*Ultima Actualizacion:* ${data.lastup}\n`;
    responseText += `*Tamaño:* ${data.size}`;

    await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: responseText }, { quoted: m });

    if (data.size.includes('GB') || parseFloat(data.size.replace(' MB', '')) > 999) {
      return await conn.sendMessage(m.chat, { text: 'El APK es demasiado pesado para ser enviado.' }, { quoted: m });
    }
    const apkBuffer = await axios.get(data.dllink, { responseType: 'arraybuffer' });
await conn.sendFile(m.chat, apkBuffer.data, `${data.name}.apk`, null, m);

  } catch (error) {
    console.error(error);
    throw 'Ocurrió un error al procesar la solicitud';
  }
};

handler.help = ['apk aplicacion'];
handler.tags = ['dl'];
handler.command = /^(apk|descargarapp|descargarapk|apk)$/i;
export default handler;
