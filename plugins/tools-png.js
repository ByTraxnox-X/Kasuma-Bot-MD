let handler = async (m, { conn, usedPrefix, command }) => {
    const notImageMessage = `Envía una imagen y responde con:\n\n*${usedPrefix + command}*`;

    if (!m.quoted && !m.mentionedJidList.length) throw notImageMessage;

    let media = m.quoted ? await m.quoted.download() : await conn.getProfilePicture(m.mentionedJidList[0]);
    if (!media) throw notImageMessage;

    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);

    const options = ['pngdoc', 'pngimg'];
    const selectedOption = options.includes(command) ? command : 'pngdoc';

    if (selectedOption === 'pngdoc') {
        await conn.sendFile(m.chat, out, 'out.png', '*Aquí tienes*', m);
    } else if (selectedOption === 'pngimg') {
        await conn.sendImage(m.chat, out, 'out.png', '*Aquí tienes*');
    }
};

handler.help = ['png <imagen>', 'png <mención>', 'pngdoc <imagen>', 'pngimg <imagen>'];
handler.tags = ['tools'];
handler.command = ['pngg', 'convpng', 'png', 'pngdoc', 'pngimg'];

export default handler;
