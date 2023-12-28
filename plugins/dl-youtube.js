
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (command == 'youtubeaudio') {
        if (!text) throw `Por favor, ingresa el texto de búsqueda. Ejemplo: !youtubeaudio [texto de búsqueda]`;

        const [, searchText] = text.match(/^!youtubeaudio\s+(.+)$/i);
      
        if (!searchText) throw 'Por favor, especifica el texto de búsqueda después de !youtubeaudio';
      
        const encodedText = encodeURIComponent(searchText);
        const res = await fetch(`https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`);
        const data = await res.json();
      
        if (!data.resultado) throw 'No se encontraron resultados para la búsqueda de YouTube.';
      
        const { title, channel, description, seconds, download } = data.resultado;
        const fileBuffer = await (await fetch(download.audio)).buffer();
        const infoMessage = `*${title}*\n\n*Canal:* ${channel}\n*Descripción:* ${description}\n*Duración:* ${seconds} segundos`;
      
        await conn.sendMessage(m.chat, { text: infoMessage.trim() }, { quoted: m });
        await conn.sendMessage(m.chat, { audio: fileBuffer, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
      };

      if (command == 'youtubevideo') {
        if (!text) throw `Por favor, ingresa el texto de búsqueda. Ejemplo: !youtubevideo [texto de búsqueda]`;

        const [, searchText] = text.match(/^!youtubevideo\s+(.+)$/i);
      
        if (!searchText) throw 'Por favor, especifica el texto de búsqueda después de !youtubevideo';
      
        const encodedText = encodeURIComponent(searchText);
        const res = await fetch(`https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`);
        const data = await res.json();
      
        if (!data.resultado) throw 'No se encontraron resultados para la búsqueda de YouTube.';
      
        const { title, channel, description, seconds, download } = data.resultado;
        const fileBuffer = await (await fetch(download.video)).buffer();
      
        const infoMessage = `*${title}*\n\n*Canal:* ${channel}\n*Descripción:* ${description}\n*Duración:* ${seconds} segundos`;

        await conn.sendMessage(m.chat, { text: infoMessage.trim() }, { quoted: m });
        await conn.sendMessage(m.chat, { video: fileBuffer, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: m });
      };
  }
      
  handler.help = handler.command = ['youtubeaudio', 'youtubevideo']
  handler.tags = ['dl']

  handler.owner = true
  
  export default handler