import fetch from "node-fetch";

let handler = async (m, { text, conn }) => {
  if (!text) throw `*[❗] Ingresa el nombre del video que quieres buscar*`;
  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://apikasu.onrender.com/api/search/tiktoksearch?text=${encodeURIComponent(text)}&apikey=GuillermoDevelop`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result && data.result.length > 0) {
      const results = data.result;
      let message = 'Resultados de la búsqueda en TikTok:\n\n';

      results.forEach((result, index) => {
        const title = result.title || 'Sin título';
        const duration = result.duration || 'Desconocida';
        const playUrl = result.play || 'Sin enlace';

        message += `Resultado ${index + 1}:\n`;
        message += `**Nombre video:** ${title}\n`;
        message += `**Duración:** ${duration} segundos\n`;
        message += `**Enlace del Video:** ${playUrl}\n\n`;
      });

      await conn.sendMessage(m.chat, message, m);
    } else {
      throw '*[❗] No se encontraron resultados para la búsqueda en TikTok*';
    }
  } catch {
    await m.reply("*[❗] Ocurrió un error al realizar la búsqueda en TikTok*");
  }
};

handler.command = ["stickersearch", "searchsticker", "stickerssearch", "searchstickers"];
export default handler;
