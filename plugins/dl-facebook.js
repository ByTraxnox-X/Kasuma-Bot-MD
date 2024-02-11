import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de Facebook.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/fbdown?url=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react('⌛');

            const data = await response.json();
            const videoUrl = data.result.Normal_video;

            const fileName = "fb.mp4";

            const videoResponse = await fetch(videoUrl);
            const fileBuffer = await videoResponse.buffer();

            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

            m.react('✅');
        } else {
            throw `
> Sin respuesta

No se pudo obtener el contenido de Facebook.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Ocurrió un error al descargar el video de Facebook: ${error.message}`;
    }
};

handler.help = ['facebook'];
handler.tags = ['dl'];
handler.command = ['facebook', 'fb'];

export default handler;
