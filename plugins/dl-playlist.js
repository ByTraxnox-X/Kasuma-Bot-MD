import yts from 'yt-search';
import fs from 'fs';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `Ingrese el nombre`;
  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };
    if (!global.videoList) {
      global.videoList = [];
    }
    if (global.videoList[0]?.from == m.sender) {
      global.videoList.splice(0, global.videoList.length);
    }
    const results = await yts(text);
    const textoInfo = `*Como descargarla*

${usedPrefix}audio <numero>
${usedPrefix}video <numero> 

*Ejemplo*

${usedPrefix}audio 5
${usedPrefix}video 8`.trim();
    const teks = results.all.map((v, i) => {
      const link = v.url;
      vids_.urls.push(link);
      return `[${i + 1}] ${v.title}
*Link:* ${v.url}
*Duración:* ${v.timestamp}
*Subido:* ${v.ago}
*Vistas:* ${v.views}\n\n`;
    }).join('');
    conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', textoInfo + '\n\n' + teks, m);
    global.videoList.push(vids_);
  } catch {
    await m.reply('Error');
  }
};
handler.help = ['playlist <texto>'];
handler.tags = ['dl'];
handler.command = /^playlist|playlist2$/i;
export default handler;