import fetch from 'node-fetch';

const handler = async (m, { text }) => {
  if (!text) throw `Ingrese el nombre de la canción.`;

  try {
    const encodedText = encodeURIComponent(text);
    const res = await fetch(`https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`);
    const data = await res.json();

    if (!data.resultado) {
      throw 'No se encontraron resultados para la búsqueda.';
    }

    const { title, channel, description, seconds, image, download } = data.resultado;

    const infoMessage = `*${title}*\n\n*Canal:* ${channel}\n*Descripción:* ${description}\n*Duración:* ${seconds} segundos`;

    await conn.sendMessage(m.chat, { text: infoMessage.trim() }, { quoted: m });


    const optionsMessage = '¿Quieres descargar el audio o el video?\n1. Audio\n2. Video';
    await conn.sendMessage(m.chat, { text: optionsMessage }, { quoted: m });

    const response = await conn.waitForMessage(m.chat, {
      fromMe: true,
      content: /^(1|2)$/i,
    });

    const userChoice = response.content.trim();

    const fileURL = userChoice === '1' ? download.audio : download.video;
    const fileBuffer = await (await fetch(fileURL)).buffer();

    const fileType = userChoice === '1' ? 'audio/mpeg' : 'video/mp4';

    await conn.sendMessage(m.chat, { [userChoice === '1' ? 'audio' : 'video']: fileBuffer, fileName: `${title}.${userChoice === '1' ? 'mp3' : 'mp4'}`, mimetype: fileType }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw 'Error al procesar la solicitud.';
  }
};

handler.help = ['youtube'];
handler.tags = ['dl'];
handler.command = /^(youtube)$/i;
export default handler;
