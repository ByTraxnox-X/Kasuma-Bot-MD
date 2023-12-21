import fetch from 'node-fetch';

const handler = async (m, { text, conn }) => {
  if (!text) throw `Ingrese el nombre de la canción.`;

  try {
    const encodedText = encodeURIComponent(text);
    const res = await fetch(`${apivisionary}/api/applemusic?url=https://music.apple.com/us/album/${encodedText}?i=${encodedText}&uo=4`);
    const data = await res.json();

    const { name, duration_ms, image, url } = data.data;

    const durationInSeconds = Math.floor(duration_ms / 1000);

    const spotifyInfo = `*${name}*\n\n` +
                        `*Duración:* ${durationInSeconds} segundos\n` +
                        `*Imagen:* ${image}\n` +
                        `*URL:* ${url}\n\n` +
                        `Enviando...`;

    await conn.sendMessage(m.chat, { text: spotifyInfo, quoted: m });

    const audioRes = await fetch(url);
    const audioBuffer = await audioRes.buffer();
    
    await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${name}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

  } catch (error) {
    console.error(error);
    throw 'Error, no hay resultados';
  }
};

handler.help = ['applemusicdownload'];
handler.tags = ['dl'];
handler.command = /^(applemusicdownload)$/i;

export default handler;
