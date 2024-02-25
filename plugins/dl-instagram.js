import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    const apikasu = 'https://apikasu.onrender.com';
    const apikeykasu = 'SebastianDevelop';

    if (!args[0]) {
        throw `Por favor, ingresa un enlace de Instagram.`;
    }

    try {
        const apiUrl = `${apikasu}/api/dowloader/instagram?url=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);
        const responseData = await response.json();

        m.react(rwait);

        if (responseData.status && responseData.result.length > 0) {
            for (const media of responseData.result) {
                m.react(done);
                await conn.sendFile(m.chat, media, media.includes('.mp4') ? 'video.mp4' : 'imagen.jpg', '', m);
            }
        } else {
            throw `
> Sin respuesta

No se pudo obtener el contenido de Instagram.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Ocurrió un error al procesar la solicitud: ${error.message}`;
    }
};

handler.help = ['instagram'];
handler.tags = ['dl'];
handler.command = /^(instagramdl|instagram|igdl|ig)$/i;

export default handler;
