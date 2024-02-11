import fetch from "node-fetch"

let handler = async (m, { text, args }) => {
  if (!args[0]) throw `Ingrese un texto para buscar en TikTok.`
  try {
    const res = await fetch(`${apikasu}/api/search/tiktoksearch?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const api = await res.json();
    const randomIndex = Math.floor(Math.random() * api.result.length);
    let video = api.result[randomIndex];
    let capt = `
> Informacion
*Video ${randomIndex + 1}*\n
*Usuario:* ${video.author.nickname}\n
*Titulo:* ${video.title}\n
*Cover:* ${video.cover}\n
*Duracion:* ${video.duration} Segundos\n
*Enlace del video:* ${video.play}\n
*Enlace de la Musica:* ${video.music}\n
*Titulo de la musica:* ${video.music_info.title}\n
*Autor de la musica:* ${video.music_info.author}\n
*Reproducciones:* ${video.play_count}\n
*Likes:* ${video.digg_count}\n
*Descargas:* ${video.download_count}\n`

    const videoUrl = video.play;
    const videoResponse = await fetch(videoUrl);
    const fileBuffer = await videoResponse.buffer();
    m.reply(capt)
    conn.sendFile(m.chat, fileBuffer, null, capt, m);

  } catch (error) {
    throw `
> Sin respuesta
Sin resultados`
  }
}
handler.help = ['tiktoksearch']
handler.tags = ['dl'];
handler.command = /^(tiktoksearch|ttsearch)$/i;

export default handler;