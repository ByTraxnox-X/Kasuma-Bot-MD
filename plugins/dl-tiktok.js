import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `https://api.cafirexos.com/api/tiktokv2?url=${args[0]}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react(rwait);

            const fileName = "tiktok.mp4";

            let fileBuffer = await response.buffer();
            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

            m.react(done);
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
