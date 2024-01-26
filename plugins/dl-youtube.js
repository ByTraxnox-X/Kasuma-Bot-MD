import fetch from 'node-fetch';
let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let enviando = false;
const handler = async (m, { command, usedPrefix, conn, text }) => {
  if (!text) throw `Ingrese el nombre o el enlace`;
if (enviando) return;
    enviando = true
  try {
    const apiUrls = [
      `https://api.cafirexos.com/api/ytplay?text=${text}`,
      `https://api.cafirexos.com/api/ytplay?text=${text}`
    ];

    for (const url of apiUrls) {
      try {
        const res = await fetch(url);
        data = await res.json();
        if (data.resultado && data.resultado.url) {
          break;
        }
      } catch {}
    }

    if (!data.resultado || !data.resultado.url) {
      enviando = false;
      throw `Error, intentelo de nuevo.`;
    } else {
      try {
        if (command === 'youtubeaudio') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'youtubevideo') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);
        }
      } catch {
          try {
            if (command === 'youtubeaudio') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp3?url=${data.resultado.url}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'youtubevideo') {
              apiUrl = `https://api.cafirexos.com/api/v1/ytmp4?url=${data.resultado.url}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);
            }
          } catch {
            enviando = false;
            throw `Error, intentelo de nuevo.`;
          }
       }
    }

    const dataMessage = `*Título:* ${data.resultado.title}\n\n*Publicado:* ${data.resultado.publicDate}\n\n*Canal:* ${data.resultado.channel}\n\n*URL:* ${data.resultado.url}`;
    await conn.sendMessage(m.chat, { text: dataMessage }, { quoted: m });

    if (buff) {
      await conn.sendMessage(m.chat, {[mimeType.startsWith('audio') ? 'audio' : 'video']: buff.data, mimetype: mimeType, fileName: fileName}, {quoted: m});
      enviando = false;
    } else {
      enviando = false;
      throw `Error, intentelo de nuevo.`;
    }
  } catch (error) {
    enviando = false;
    throw `Error, intentelo de nuevo.`;
  }
};

handler.help = ['youtubeaudio', 'youtubevideo'];
handler.tags = ['dl']
handler.command = ['youtubeaudio', 'youtubevideo'];

export default handler;