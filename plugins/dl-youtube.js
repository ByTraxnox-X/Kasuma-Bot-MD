import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (command == 'youtubeaudio') {
            if (!text) throw `Ingrese el nombre de la canción.`;
        
            try {
                const encodedText = encodeURIComponent(text);
                const apiUrl = `https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`;
                const res = await fetch(apiUrl);
                const data = await res.json();
                const audioDownloadLink = data.resultado.download.audio;
                const audioResponse = await fetch(audioDownloadLink);
                const audioBuffer = await audioResponse.buffer();
        
                await conn.sendMessage(m.chat, { audio: audioBuffer, fileName: `${text}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        
            } catch (error) {
                console.error(error);
                throw 'Error, no hay resultados';
            
            }
        }
      if (command == 'youtubevideo') {
        if (!text) throw `Ingrese el nombre de la canción.`;

        try {
            const encodedText = encodeURIComponent(text);
            const apiUrl = `https://visionaryapi.boxmine.xyz/api/ytplay?text=${encodedText}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            const videoDownloadLink = data.resultado.download.video;
            const videoResponse = await fetch(videoDownloadLink);
            const videoBuffer = await videoResponse.buffer();
    
            await conn.sendMessage(m.chat, { video: videoBuffer, fileName: `${text}.mp4`, mimetype: 'video/mp4' }, { quoted: m });
    
        } catch (error) {
            console.error(error);
            throw 'Error, no hay resultados';
        }
  }
}
      
  handler.help = handler.command = ['youtubeaudio', 'youtubevideo']
  handler.tags = ['dl']

  export default handler