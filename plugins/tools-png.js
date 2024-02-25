import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    const notImageMessage = `Envía una imagen y responde con:\n\n*${usedPrefix + command}*`;
    if (!m.quoted) throw notImageMessage;

    const q = m.quoted || m;
    let mime = q.mimetype || '';
    if (!mime.startsWith('image/')) throw notImageMessage;

    try {
        let media = await q.download();
        let out = await webp2png(media);
        
        if (!out.length) throw 'Error al convertir la imagen a PNG.';

        let fileType = 'document';
        let fileName = 'out.png';
        const fileBuffer = Buffer.from(out);

        // Obtener la URL de la imagen original
        let imgUrl = '';
        if (q.msg) {
            imgUrl = q.msg.url || '';
        }

        await conn.sendFile(m.chat, fileBuffer, fileName, '*Aquí tienes*', m);
    } catch (error) {
        throw `Error: ${error.message}`;
    }
};

handler.help = ['png <imagen>'];
handler.tags = ['tools'];
handler.command = ['pngimg', 'convpng', 'png'];

export default handler;
