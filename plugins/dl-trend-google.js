import fetch from "node-fetch";

let handler = async (m, { text, args }) => {
  if (!args[0]) throw `Ingrese un país para buscar en trends.`;
  try {
    const res = await fetch(`${apikasu}/api/search/youtube-trend?country=${encodeURIComponent(text)}&apikey=${apikeykasu}`);
    const api = await res.json();
    const data = api.result.data.slice(0, 3);
    let capt = `
> Información

*${api.result.message}*\n
*Actualizado el:* ${api.result.updated_at}\n`;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      capt += `
*Trend ${i + 1}*\n
*Titulo:* ${item.title}\n
*Canal:* ${item.channel}\n
*Subido el:* ${item.uploaded_at}\n
*Visualizaciones:* ${item.viewers}\n
*Likes:* ${item.likes}\n
*Dislikes:* ${item.dislikes}\n
*Comentarios:* ${item.comments}\n
*Descripción:* ${item.description}\n
*URL:* ${item.url}\n`;
    }
    const thumbnailUrl = data[0].thumbnail;
    const thumbnailResponse = await fetch(thumbnailUrl);
    const thumbnailBuffer = await thumbnailResponse.buffer();
    m.reply(capt, m.from);
    m.reply(thumbnailBuffer, m.from, { filename: 'thumbnail.jpg', caption: capt });
  } catch (error) {
    throw `
> Sin respuesta

Sin resultados`;
  }
};
handler.help = ['youtubetrend'];
handler.tags = ['dl'];
handler.command = /^(youtubetrend|yttrend)$/i;

export default handler;
