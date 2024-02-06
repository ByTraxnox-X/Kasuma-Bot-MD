import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw 'Por favor, ingresa un enlace';
    }

    try {
        const apiUrl = `${apikasu}/api/dowloader/threads?url=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status) {
            m.react(rwait);

            if (data.result.length > 0) {
                for (const media of data.result) {
                    m.reply(`Descargando ${media.ext === 'mp4' ? 'video' : 'imagen'}...`);
                    await conn.sendFile(m.chat, media.link, `media.${media.ext}`, '', m);
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

export default handler;