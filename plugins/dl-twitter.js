import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de Twitter.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/twitter?url=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react(rwait);

            const data = await response.json();
            const videoUrl = data.result.video;

            const fileName = "twitter.mp4";

            const videoResponse = await fetch(videoUrl);
            const fileBuffer = await videoResponse.buffer();

            conn.sendFile(m.chat, fileBuffer, fileName, "", m);

            m.react(done);
        } else {
            throw 'No se pudo obtener el contenido de Twitter.';
        }
    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al descargar el video de Twitter: ${error.message}`;
    }
};

handler.help = ['twitter'];
handler.tags = ['dl'];
handler.command = ['twitter', 'tw'];

export default handler;