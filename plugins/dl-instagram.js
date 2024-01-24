import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw `Por favor, ingresa un enlace de Instagram.`;
    }

    try {
        const apiUrl = `${apivisionary}/api/v1/igdl?url=${args[0]}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        m.react(rwait)

        if (data.success && data.data.length > 0) {
            for (const media of data.data) {
                if (media.type === 'video')
                 {
                    m.react(done)
                    await conn.sendFile(m.chat, media.url_download, 'video.mp4', '', m);
                } else {
                    m.react(done)
                    await conn.sendFile(m.chat, media.url_download, 'imagen.jpg', '', m);
                }
            }
        } else {
            throw 'No se pudo obtener el contenido de Instagram.';
        }
    } catch (error) {
        throw `Ocurrió un error al procesar la solicitud: ${error}`;
    }
};

handler.help = ['instagram'];
handler.tags = ['dl'];
handler.command = /^(instagramdl|instagram|igdl|ig)$/i;

export default handler
