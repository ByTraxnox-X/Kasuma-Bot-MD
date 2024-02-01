import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `https://apikasu.onrender.com/api/dowloader/tikok?url=${args[0]}&apikey=SebastianDevelop`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react('⌛');

            const data = await response.json();
            const videoUrl = data.result.vídeo;

            const fileName = "tiktok.mp4";

            const videoResponse = await fetch(videoUrl);
            const fileBuffer = await videoResponse.buffer();

            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

            m.react('✅');
        } else {
            throw 'No se pudo obtener el contenido de TikTok.';
        }
    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al descargar el video de TikTok: ${error.message}`;
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt'];

export default handler;
