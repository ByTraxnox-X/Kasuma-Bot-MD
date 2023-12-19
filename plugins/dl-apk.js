import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `*Ingrese el nombre del APK`;
  try {    
    m.react(rwait)
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `\t\t*${data5.name}*

*Package:* ${data5.package}
*Ultima Actualizacion:* ${data5.lastup}
*Tamaño:* ${data5.size}`
    m.react(done)
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: 'El APK es demasiado pesado para ser enviado.'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `error`;
  }    
};
handler.help = ['apk aplicacion']
handler.tags = ['dl']
handler.command = /^(apk|descargarapp|descargarapk|apk)$/i;
export default handler;
