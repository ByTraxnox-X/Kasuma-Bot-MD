import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    try {
        const apiUrl = `${apikasu}/api/search/pinterest?text=${encodeURIComponent(args[0])}&apikey=${apikeykasu}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.result.length > 0) {
            m.react(rwait);

            const firstThreeImages = data.result.slice(0, 3);

            for (const imageUrl of firstThreeImages) {
                await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', '', m);
            }

            m.react(done);
        } else {
            throw `
> Sin respuesta

No se pudo obtener imágenes de Pinterest.`;
        }
    } catch (error) {
        throw `
> Sin respuesta

Ocurrió un error al procesar la solicitud: ${error}`;
    }
};

handler.help = ['pinterest'];
handler.tags = ['dl'];
handler.command = /^pinterest$/i;

export default handler;