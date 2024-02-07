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
      `${apikasu}/api/search/youtube?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`,
      `${apikasu}/api/search/youtube?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`
    ];

    for (const url of apiUrls) {
      try {
        const res = await fetch(url);
        data = await res.json();
        if (data.result && data.result.url) {
          break;
        }
      } catch {}
    }

    if (!data.result || !data.result.url) {
      enviando = false;
      throw `Error, intentelo de nuevo.`;
    } else {
      try {
        if (command === 'youtubeaudio') {
              apiUrl = `${apikasu}/api/dowloader/youtubemp3?url=${data.result.url}&apikey=${apikeykasu}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'youtubevideo') {
              apiUrl = `${apikasu}/api/dowloader/youtubemp4?url=${data.result.url}&apikey=${apikeykasu}`;
              mimeType = 'video/mp4';
              fileName = 'error.mp4';
              buff = await conn.getFile(apiUrl);
        }
      } catch {
          try {
            if (command === 'youtubeaudio') {
              apiUrl = `${apikasu}/api/dowloader/youtubemp3?url=${data.result.url}&apikey=${apikeykasu}`;
              mimeType = 'audio/mpeg';
              fileName = 'error.mp3';
              buff = await conn.getFile(apiUrl);
            } else if (command === 'youtubevideo') {
              apiUrl = `${apikasu}/api/dowloader/youtubemp4?url=${data.result.url}&apikey=${apikeykasu}`;
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

    const dataMessage = `*Título:* ${data.result.title}\n\n*Publicado:* ${data.result.publicDate}\n\n*Canal:* ${data.result.channel}\n\n*URL:* ${data.result.url}`;
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