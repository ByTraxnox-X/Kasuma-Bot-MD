import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw 'Ingrese una petición';
  await conn.sendMessage(m.chat, { text: 'Realizando...' }, { quoted: m });

  try {
    // API 1
    const apiUrl1 = `https://vihangayt.me/tools/lexicaart?q=${encodeURIComponent(text)}`;
    const response1 = await fetch(apiUrl1);
    const data1 = await response1.json();

    if (data1.status && data1.data && data1.data.length > 0) {
      const image1 = data1.data[0].images[0].url;
      await conn.sendMessage(m.chat, { image: { url: image1 } }, { quoted: m });
      return;
    }
  } catch (error1) {
    console.log('Error en API 1:', error1);

    try {
      const apiUrl2 = `https://vihangayt.me/tools/aiimg?q=${encodeURIComponent(text)}`;
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();

      if (data2.status && data2.data && data2.data.aiImageData && data2.data.aiImageData.length > 0) {
        const image2 = data2.data.aiImageData[0].images[0].url;
        await conn.sendMessage(m.chat, { image: { url: image2 } }, { quoted: m });
        return;
      }
    } catch (error2) {
      console.log('Error en API 2:', error2);
    }
  }

  console.log('Ninguna API funciona');
  throw 'Error en las APIs';
};

handler.help = ['dalle'];
handler.tags = ['ai'];
handler.command = /^(dalle)$/i;

export default handler;
