import axios from 'axios';

let handler = async (m, { conn, text: tiktok }) => {
    if (!tiktok) {
        throw 'Ingresa un enlace de TikTok con imágenes';
    }

    try {
        const apiURL = `${apikasu}/api/dowloader/tikok?url=${tiktok}&apikey=${apikeykasu}`;
        const response = await axios.get(apiURL);
        const responseData = response.data;

        m.react(rwait);

        if (responseData.status && responseData.result.photo && responseData.result.photo.length > 0) {
            const photoData = responseData.result.photo;

            for (const photo of photoData) {
                m.react(done);
                const imageBuffer = await axios.get(photo.url_download, { responseType: 'arraybuffer' });
                await conn.sendMessage(m.chat, { image: { data: imageBuffer.data, mimetype: 'image/jpeg' } }, m);
            }
        } else {
            throw 'No se encontraron imágenes para este TikTok.';
        }
    } catch (error) {
        throw `Error al obtener imágenes del TikTok: ${error}`;
    }
};

handler.help = ['tiktokimg'];
handler.tags = ['dl'];
handler.command = /^(ttimg|tiktokimg)$/i;
export default handler;