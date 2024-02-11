import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw `Ingrese el nombre de la canción.`;

  try {
    const infoRes = await fetch(`${apikasu}/api/search/spotifyinfo?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const infoData = await infoRes.json();
    const sptyInfo = infoData.spotify.resultado;

    let spotifyInfo = `> Informacion\n
    
*Titulo:*${sptyInfo.title}\n
*Artista:* ${sptyInfo.artist}\n
*Album:* ${sptyInfo.album}\n
*Genero:* ${sptyInfo.genre}\n
*Publicado:* ${sptyInfo.year}\n\n
*URL:* ${sptyInfo.url}\n`

    await conn.sendMessage(m.chat, { text: spotifyInfo.trim() }, { quoted: m });

  } catch (error) {
    console.error(error);
    throw '> Sin respuesta\nError, no hay resultados';
  }
};

handler.help = ['spotifysearch'];
handler.tags = ['dl'];
handler.command = /^(spotifysearch|spotifybuscar)$/i;

export default handler;