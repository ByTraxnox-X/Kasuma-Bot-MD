import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw `Ingrese el nombre de la canción.`;

  try {
    const infoRes = await fetch(`${apikasu}/api/dowloader/deezer?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const infoData = await infoRes.json();
    const deezerInfo = infoData.result[0];

    m.reply(`${wait}`);

    let deezerInfoText = `> Informacion\n*${deezerInfo.title}*\n\n`;
    deezerInfoText += `*Artista:* ${deezerInfo.artist.name}\n`;
    deezerInfoText += `*Album:* ${deezerInfo.album.title}\n`;
    deezerInfoText += `*Duración:* ${deezerInfo.duration} segundos\n`;
    deezerInfoText += `*Enlace:* ${deezerInfo.link}\n\n`;
    deezerInfoText += `Enviando...`;

    await conn.sendMessage(m.chat, { text: deezerInfoText.trim() }, { quoted: m });

    const audioRes = await fetch(deezerInfo.preview);

    if (!audioRes.ok) {
      throw '> Sin respuesta\nError al obtener el audio de Deezer.';
    }

    const music = await conn.getFile(audioRes.url);

    await conn.sendMessage(m.chat, {
      audio: music.data,
      fileName: `${deezerInfo.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    throw '> Sin respuesta\nError, no hay resultados';
  }
};

handler.help = ['deezer'];
handler.tags = ['dl'];
handler.command = /^(deezer)$/i;

export default handler;