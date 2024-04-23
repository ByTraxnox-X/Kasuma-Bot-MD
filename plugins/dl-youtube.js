const handler = async (m, { command, conn, text }) => {
  if (!text) throw `Ingrese el enlace o texto para continuar.`;
  if (enviando) return;
  enviando = true;

  try {
    let apiUrl;
    let mimeType;
    let fileName;

    if (command === 'youtubeaudio') {
      apiUrl = `${apikasu}/api/dowloader/youtubemp3?url=${text}&apikey=${apikeykasu}`;
      mimeType = 'audio/mpeg';
      fileName = 'error.mp3';
    } else if (command === 'youtubevideo') {
      apiUrl = `${apikasu}/api/dowloader/youtubemp4?url=${text}&apikey=${apikeykasu}`;
      mimeType = 'video/mp4';
      fileName = 'error.mp4';
    }

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.status && data.result) {
        const dataMessage = `
> Información

*ID:* ${data.result.id}
*Título:* ${data.result.title}
*Thumbnail:* ${data.result.thumbnail}
*URL:* ${text}`;

        await conn.sendMessage(m.chat, { text: dataMessage }, { quoted: m });

        const buff = await fetch(data.result); // Fetching the audio directly from the new API URL

        await conn.sendMessage(m.chat, { audio: buff.buffer(), mimetype: mimeType, fileName: fileName }, { quoted: m });
        enviando = false;
      } else {
        throw new Error('Sin respuesta válida');
      }
    } catch {
      enviando = false;
      throw `
> Sin respuesta

Error, inténtelo de nuevo.`;
    }
  } catch (error) {
    enviando = false;
    throw `
> Sin respuesta

Error, inténtelo de nuevo.`;
  }
};


handler.help = ['youtubeaudio', 'youtubevideo'];
handler.tags = ['dl'];
handler.command = ['youtubeaudio', 'youtubevideo'];

export default handler;
