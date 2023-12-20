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

        if (responseData.data && responseData.data.length > 0) {
            const images = responseData.data.map(url => ({ image: { url } }));
            m.react(done);
            await conn.sendMessage(m.chat, images, m);
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
