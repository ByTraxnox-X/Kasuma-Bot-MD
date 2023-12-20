import axios from 'axios';

let handler = async (m, { conn, text: tiktok }) => {
    if (!tiktok) {
        throw 'Ingresa un enlace de TikTok con imágenes';
    }

    try {
        const apiUrl = `${apivisionary}/api/ttimg?url=` + (tiktok);
        const response = await axios.get(apiUrl);
        const responseData = response.data;

        m.react(rwait);

        if (responseData.status && responseData.data) {
            const result = responseData.data;

            if (result.length > 0) {
                const images = result.map(image => ({ image: { url: image } }));
                m.react(done);
                await conn.sendMessage(m.chat, images, m);
            } else {
                throw 'No se encontraron imágenes para este TikTok.';
            }
        } else {
            throw 'No se pudieron obtener datos del TikTok.';
        }
    } catch (error) {
        throw `Error al obtener imágenes del TikTok: ${error}`;
    }
};

handler.help = ['tiktokimg'];
handler.tags = ['dl'];
handler.command = /^(ttimg|tiktokimg)$/i;
export default handler;
