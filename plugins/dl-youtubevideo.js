import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de Youtube.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/youtubemp4?url=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react('⌛');

            const data = await response.json();
            const videoUrl = data.result.vid_360p;

            const fileName = "youtube.mp4";

            const videoResponse = await fetch(videoUrl);
            const fileBuffer = await videoResponse.buffer();

            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

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

Ocurrió un error al descargar el video de Youtube: ${error.message}`;
    }
};

handler.help = ['youtubevideo'];
handler.tags = ['dl'];
handler.command = ['youtubevideo', 'ytvideo'];

export default handler;
