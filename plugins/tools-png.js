let handler = async (m, { conn, usedPrefix, command }) => {
    const notImageMessage = `Envía una imagen y responde con:\n\n*${usedPrefix + command}*`;
    if (!m.quoted) throw notImageMessage;

    const q = m.quoted || m;
    let mime = q.mimetype || '';
    if (!mime.startsWith('image/')) throw notImageMessage;

    let media = await q.download();
    let out = Buffer.from(media);
    await conn.sendFile(m.chat, out, 'out.png', '*Aquí tienes*', m);
};

handler.help = ['png <imagen>'];
handler.tags = ['tools'];
handler.command = ['pngg', 'convpng', 'png'];

export default handler;
