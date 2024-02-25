import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, command }) => {
    const notImageMessage = `Envía una imagen y responde con:\n\n*.png*`;

    if (!m.quoted && (!m.mentionedJidList || m.mentionedJidList.length === 0)) throw notImageMessage;

    let media;
    if (m.quoted) {
        media = await m.quoted.download();
    } else {
        const mentionedJid = m.mentionedJidList[0];
        const profilePic = await conn.getProfilePicture(mentionedJid);
        if (!profilePic) throw notImageMessage;
        media = await conn.downloadMediaMessage({ url: profilePic });
    }

    if (!media.length) throw 'No se pudo obtener la imagen correctamente.';

    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);

    await conn.sendFile(m.chat, out, 'out.png', '*Aquí tienes*', m);
};

handler.help = ['png <imagen>', 'png <mención>'];
handler.tags = ['tools'];
handler.command = ['png'];

export default handler;
