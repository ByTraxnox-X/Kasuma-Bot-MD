import fetch from 'node-fetch';

const handler = async (m, { text }) => {
  if (!text || !/^youtube\s/i.test(text)) {
    throw `El comando debe comenzar con "youtube". Por ejemplo: youtube [texto de búsqueda] [audio/video]`;
  }

  const [, searchText, fileType] = text.match(/^youtube\s+(.+?)(?:\s+(audio|video))?$/i);

  if (!searchText) {
    throw 'Por favor, especifica el texto de búsqueda después de "youtube".';
  }
  if (!fileType) {
    throw 'Por favor, especifica si quieres "audio" o "video" después de la búsqueda.';
  }
  const encodedText = encodeURIComponent(searchText);
  const res = await fetch(`https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`);
  const data = await res.json();

  if (!data.resultado) {
    throw 'No se encontraron resultados para la búsqueda de YouTube.';
  }

  const { title, channel, description, seconds, download } = data.resultado;

  const fileTypeLower = fileType.toLowerCase();

  const fileURL = fileTypeLower === 'audio' ? download.audio : download.video;
  const fileBuffer = await (await fetch(fileURL)).buffer();

  const infoMessage = `*${title}*\n\n*Canal:* ${channel}\n*Descripción:* ${description}\n*Duración:* ${seconds} segundos`;

  await conn.sendMessage(m.chat, { text: infoMessage.trim() }, { quoted: m });
  
  await conn.sendMessage(m.chat, { [fileTypeLower]: fileBuffer, fileName: `${title}.${fileTypeLower === 'audio' ? 'mp3' : 'mp4'}`, mimetype: fileTypeLower === 'audio' ? 'audio/mpeg' : 'video/mp4' }, { quoted: m });
};

handler.help = ['youtube'];
handler.tags = ['dl'];
handler.command = /^(youtube)$/i;
export default handler;
