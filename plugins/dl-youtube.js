import fetch from 'node-fetch';

const handler = async (m, { text }) => {
  if (!text) throw `Ingrese la búsqueda de YouTube. Por ejemplo: youtube [texto de búsqueda] [audio/video]`;

  const isYouTubeCommand = /^youtube\s/i.test(text);

  if (!isYouTubeCommand) {
    throw `El comando debe comenzar con "youtube". Por ejemplo: youtube [texto de búsqueda] [audio/video]`;
  }

  const searchText = text.replace(/^youtube\s+/i, '').trim();

  if (!searchText) {
    throw 'Por favor, especifique el texto de búsqueda después de "youtube".';
  }

  const optionsMessage = '¿Quieres descargar el audio o el video?\n1. Audio\n2. Video';
  await conn.sendMessage(m.chat, { text: optionsMessage }, { quoted: m });

  const response = await conn.waitForMessage(m.chat, {
    fromMe: true,
    content: /^(1|2)$/i,
  });


  const userChoice = response.content.trim();

  const encodedText = encodeURIComponent(searchText);
  const res = await fetch(`https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`);
  const data = await res.json();

  if (!data.resultado) {
    throw 'No se encontraron resultados para la búsqueda de YouTube.';
  }

  const { title, channel, description, seconds, download } = data.resultado;

  const fileType = userChoice === '1' ? 'audio/mpeg' : 'video/mp4';
  const fileURL = userChoice === '1' ? download.audio : download.video;
  const fileBuffer = await (await fetch(fileURL)).buffer();

  const infoMessage = `*${title}*\n\n*Canal:* ${channel}\n*Descripción:* ${description}\n*Duración:* ${seconds} segundos`;

  await conn.sendMessage(m.chat, { text: infoMessage.trim() }, { quoted: m });

  await conn.sendMessage(m.chat, { [userChoice === '1' ? 'audio' : 'video']: fileBuffer, fileName: `${title}.${userChoice === '1' ? 'mp3' : 'mp4'}`, mimetype: fileType }, { quoted: m });
};

handler.help = ['youtube'];
handler.tags = ['dl'];
handler.command = /^(youtube)$/i;
export default handler;
