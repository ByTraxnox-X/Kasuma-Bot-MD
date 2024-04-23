import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de Youtube.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/youtubemp3?url=${encodeURIComponent(args[0])}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react('⌛');

            const data = await response.json();
            const AudioUrl = data.result;

            const fileName = "youtube.mp3";

            const videoResponse = await fetch(AudioUrl);
            const fileBuffer = await videoResponse.buffer();
            await conn.sendMessage(m.chat, {
                audio: fileBuffer,
                fileName: `${fileName}`.mp3,
                mimetype: 'audio/mpeg'
            }, { quoted: m });

            m.react('✅');
        } else {
            throw `
> Sin respuesta

No se pudo obtener el contenido de Youtube.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Ocurrió un error al descargar el audio de Youtube: ${error.message}`;
    }
};

handler.help = ['youtubeaudio'];
handler.tags = ['dl'];
handler.command = ['youtubeaudio', 'ytaudio'];

export default handler;
