import fetch from "node-fetch"

let handler = async (m, { text, args }) => {
  if (!args[0]) throw `Ingrese un texto para buscar en TikTok.`
  try {
    const res = await fetch(`${apikasu}/api/search/tiktoksearch?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const api = await res.json();
    const randomIndex = Math.floor(Math.random() * api.result.length);
    let video = api.result[randomIndex];
    let capt = `\t\t*TikTok resultados*\n\n`;
    capt += `*Video ${randomIndex + 1}*\n`;
    capt += `*Usuario:* ${video.author.nickname}\n`;
    capt += `*Titulo:* ${video.title}\n`;
    capt += `*Cover:* ${video.cover}\n`;
    capt += `*Duracion:* ${video.duration} Segundos\n`;
    capt += `*Enlace del video:* ${video.play}\n`;
    capt += `*Enlace de la Musica:* ${video.music}\n`;
    capt += `*Titulo de la musica:* ${video.music_info.title}\n`;
    capt += `*Autor de la musica:* ${video.music_info.author}\n`;
    capt += `*Reproducciones:* ${video.play_count}\n`;
    capt += `*Likes:* ${video.digg_count}\n`;
    capt += `*Descargas:* ${video.download_count}\n`;
    capt += `\n`;

    const videoUrl = video.play;
    const videoResponse = await fetch(videoUrl);
    const fileBuffer = await videoResponse.buffer();
    m.reply(capt)
    conn.sendFile(m.chat, fileBuffer, null, capt, m);

  } catch (error) {
    throw `Sin resultados`
  }
}
handler.help = ['tiktoksearch']
handler.tags = ['dl'];
handler.command = /^(tiktoksearch|ttsearch)$/i;

export default handler;