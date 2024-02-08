import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
  if (!text) {
    throw 'Por favor, escribe tu nombre para jugar';
  }

  try {
    const reversedName = text.split('').reverse().join('');

    const apiUrl = `${apikasu}/api/soundoftext?text=${encodeURIComponent(reversedName)}&lang=es-ES&apikey=${apikeykasu}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result) {
      const audioUrl = data.result;

      if (audioUrl) {
        const audioBuffer = await fetch(audioUrl).then(res => res.buffer());
        
        await conn.sendFile(m.chat, audioBuffer, 'audio.mp3', null, m, true, {
          type: 'audioMessage',
          ptt: true,
        });
      } else {
        throw 'No se pudo obtener la URL del audio de la API';
      }
    } else {
      throw 'No se pudo obtener el audio de la API';
    }
  } catch (error) {
    throw `Ocurrió un error al generar el audio: ${error}`;
  }
};

handler.command = ['nombrealrevezvoz'];
handler.help = ['nombrealrevezvoz'];
handler.tags = ['game'];
export default handler;
