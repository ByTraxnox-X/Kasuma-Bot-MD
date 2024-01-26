import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw `Por favor, ingresa un enlace de Instagram.`;
    }

    try {
        const apiUrl = `https://vihangayt.me/download/instagram2?url=${args[0]}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        m.react(rwait);

        if (data.status && data.data.length > 0) {
            for (const media of data.data) {
                const fileType = media.type === 'video' ? 'video.mp4' : 'imagen.jpg';
                m.react(done);

                await conn.sendFile(m.chat, media.download_link, fileType, '', m);
            }
        } else {
            throw 'No se pudo obtener el contenido de Instagram.';
        }
    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al procesar la solicitud: ${error.message}`;
    }
};

handler.help = ['instagram'];
handler.tags = ['dl'];
handler.command = /^(instagramdl|instagram|igdl|ig)$/i;

export default handler;
