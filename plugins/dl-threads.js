import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw 'Por favor, ingresa un enlace';
    }

    try {
        const apiUrl = `https://api.betabotz.eu.org/api/download/threads?url=${args[0]}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status) {
            m.react(rwait);

            if (data.result.image_urls.length > 0) {
                for (const imageUrl of data.result.image_urls) {
                    m.reply('Descargando imagen...');
                    await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', '', m);
                }
            }

            if (data.result.video_urls.length > 0) {
                for (const videoUrl of data.result.video_urls) {
                    m.reply('Descargando video...');
                    await conn.sendFile(m.chat, videoUrl, 'video.mp4', '', m);
                }
            }

            m.react(done);
        } else {
            throw 'No se pudo obtener el contenido de Threads.';
        }
    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al procesar la solicitud: ${error.message}`;
    }
};

handler.help = ['threads'];
handler.tags = ['dl'];
handler.command = /^(threadsdl|threads)$/i;

export default handler;
