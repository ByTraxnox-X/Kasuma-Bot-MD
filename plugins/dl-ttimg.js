import axios from 'axios';

let handler = async (m, { conn, text: tiktok }) => {
    if (!tiktok) {
        throw 'Ingresa un enlace de TikTok con imágenes';
    }

    try {
        const apiURL = `${apivisionary}/api/ttimg?url=${tiktok}`;
        const response = await axios.get(apiURL);
        const responseData = response.data;

        m.react(rwait);

        if (responseData.data && responseData.data.length > 0) {
            const imageUrls = responseData.data;

            for (const imageUrl of imageUrls) {
                m.react(done);
                await conn.sendMessage(m.chat, { image: { url: imageUrl } }, m);
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
