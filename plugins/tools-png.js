import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, text }) => {
    if (!text && (!m.quoted || m.quoted.mimetype.startsWith('image/'))) throw 'Envía una imagen y responde con:\n\n*.png*';

    let media;
    if (text) {
        const res = await conn.download({ url: text });
        if (!res) throw 'No se pudo obtener la imagen correctamente.';
        media = await res.buffer();
    } else {
        media = await m.quoted.download();
    }

    if (!media.length) throw 'No se pudo obtener la imagen correctamente.';

    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);

    if (!out.length) throw 'Error al convertir la imagen a PNG.';

    let fileType = 'image/png';
    let fileName = 'out.png';

    const fileBuffer = Buffer.from(out);

    if (m.text.toLowerCase().includes('doc')) {
        fileType = 'document';
        fileName = 'out.png';
    }

    await conn.send2Button(m.chat, `*Aquí tienes*`, '¿Enviarlo como Documento o Imagen?', 'Documento', `.pngdoc ${text || m.quoted ? 'enlace' : 'respuesta'}`, 'Imagen', `.pngimg ${text || m.quoted ? 'enlace' : 'respuesta'}`, m, { file: fileBuffer, type: fileType, mimetype: fileType, filename: fileName });
};

handler.help = ['png <imagen>', 'png <enlace>'];
handler.tags = ['tools'];
handler.command = ['png'];

export default handler;
