import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw `Ingrese el nombre de la canción.`;

  try {
    const infoRes = await fetch(`${apikasu}/api/search/spotifyinfo?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const infoData = await infoRes.json();
    const sptyInfo = infoData.spotify.resultado;
    
    let spotifyInfo = `*${sptyInfo.title}*\n\n`;
    spotifyInfo += `*Artista:* ${sptyInfo.artist}\n`;
    spotifyInfo += `*Album:* ${sptyInfo.album}\n`; 
    spotifyInfo += `*Genero:* ${sptyInfo.genre}\n`;
    spotifyInfo += `*Publicado:* ${sptyInfo.year}\n\n`;
    spotifyInfo += `*URL:* ${sptyInfo.url}\n`;
    spotifyInfo += `Enviando...`;

    await conn.sendMessage(m.chat, { text: spotifyInfo.trim() }, { quoted: m });
    const audioRes = await fetch(`${apikasu}/api/dowloader/spotify?url=${sptyInfo.url}&apikey=${apikeykasu}`);

    if (!audioRes.ok) {
      throw 'Error al obtener el audio de Spotify.';
    }

    const music = await conn.getFile(audioRes.url);

    await conn.sendMessage(m.chat, {
      audio: music.data,
      fileName: `${sptyInfo.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    throw 'Error, no hay resultados';
  }
};

handler.help = ['spotify'];
handler.tags = ['dl'];
handler.command = /^(spotify|music)$/i;

export default handler;