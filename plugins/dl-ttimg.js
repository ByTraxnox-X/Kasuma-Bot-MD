require('events').EventEmitter.defaultMaxListeners = 15;
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
            for (const imageUrl of responseData.data) {
                const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageName = 'image.jpg';

                m.react(done);
                await conn.sendMessage(m.chat, { buffer: imageBuffer.data, filename: imageName, mimetype: 'image/jpeg' }, m);
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
