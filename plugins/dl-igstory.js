import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un username de Instagram.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/igstory?username=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react('⌛');

            const data = await response.json();
            const videoUrls = data.result;

            for (let i = 0; i < videoUrls.length; i++) {
                const videoResponse = await fetch(videoUrls[i]);
                const fileBuffer = await videoResponse.buffer();

                const fileName = `igstory_${i + 1}.mp4`;
                await conn.sendFile(m.chat, fileBuffer, fileName, "", m);
            }

            m.react('✅');
        } else {
            throw `
> Sin respuesta

No se pudo obtener el contenido de Instagram Story.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Ocurrió un error al descargar el video de Instagram Story: ${error.message}`;
    }
};

handler.help = ['igstory'];
handler.tags = ['dl'];
handler.command = ['igstory', 'instgramhistoria'];

export default handler;