import axios from 'axios';

let handler = async (m, { conn, text: tiktok }) => {
    if (!tiktok) {
        throw 'Ingresa un enlace de TikTok con imágenes';
    }

    try {
        const apiURL = `${apikasu}/api/dowloader/tikok?url=${tiktok}&apikey=${apikeykasu}`;
        const response = await axios.get(apiURL);
        const responseData = response.data;

        m.react('⌛');

        if (responseData.status && responseData.result.photo && responseData.result.photo.length > 0) {
            const photoData = responseData.result.photo;

            for (const photo of photoData) {
                const imageBuffer = await axios.get(photo.url_download, { responseType: 'arraybuffer' });
                await conn.sendFile(m.chat, imageBuffer.data, 'tiktok_image.jpg', '', m);
            }

            m.react('✅');
        } else {
            throw `
> Sin respuesta
No se encontraron imágenes para este TikTok.`;
        }
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta
Error al obtener imágenes del TikTok: ${error.message}`;
    }
};

handler.help = ['tiktokimg'];
handler.tags = ['dl'];
handler.command = /^(ttimg|tiktokimg)$/i;
export default handler;
