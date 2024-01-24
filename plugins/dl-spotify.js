import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
 if (!text) throw `Ingrese el nombre de la canción.`;
  try {
    const encodedText = encodeURIComponent(text);
    const res = await fetch(global.API(`${apivisionary}`, `/api/spotifysearch?text=${encodedText}${token}`));
    const data = await res.json();
    const linkDL = data.spty.resultado[0].link;
    const musics = await fetch(global.API(`${apivisionary}`, `/api/spotifydl?text=${linkDL}${token}`));
    const music = await conn.getFile(musics.url);
    const infos = await fetch(global.API(`${apivisionary}`, `/api/spotifyinfo?text=${encodedText}${token}`));
    const info = await infos.json();
    const spty = info.spty.resultado;
    const img = await (await fetch(`${spty.thumbnail}`)).buffer();
    let spotifyi = `*${spty.title}*\n\n`
    spotifyi += `*Artista:* ${spty.artist}\n`
    spotifyi += `*Album:* ${spty.album}\n`
    spotifyi += `*Publicado:* ${spty.year}\n\n`
    spotifyi += `Enviando...`
    await conn.sendMessage(m.chat, {text: spotifyi.trim(), contextInfo: {forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "thumbnailUrl": img, "mediaUrl": linkDL, "sourceUrl": linkDL}}}, {quoted: m});
    await conn.sendMessage(m.chat, {audio: music.data, fileName: `${spty.name}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  } catch (error) {
    console.error(error);
    throw 'Error, no hay resultados';
  }
};

handler.help = ['spotify'];
handler.tags = ['dl'];
handler.command = /^(spotify|music)$/i;
export default handler;
