import axios from 'axios';

let handler = async (m, { conn, text: tiktok }) => {
    if (!tiktok) {
        throw 'Ingresa un enlace de TikTok con imágenes';
    }

    try {
        const apiURL = `https://api.fgmods.xyz/api/downloader/tiktok2?url=${tiktok}&apikey=${tiktokkey}`;
        const response = await axios.get(apiURL);
        const responseData = response.data;

        m.react(rwait);

        if (responseData.status && responseData.result) {
            const result = responseData.result;

            if (result.images && result.images.length > 0) {
                for (const image of result.images) {
                    m.react(done);
                    await conn.sendMessage(m.chat, { image: { url: image.url } }, m);
                }
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
