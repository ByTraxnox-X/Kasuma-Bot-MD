import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `${api}/api/tiktokv2?url=${args[0]}${token}`;
        const response = await fetch(apiUrl);
        const data = await response.buffer();
        
        m.react(rwait);

        const fileName = "tiktok.mp4";

        let fileBuffer = await fetch(data.link).then(response => response.buffer());
        conn.sendFile(m.chat, fileBuffer, fileName, "", m);
    } catch (error) {
        throw `Ocurrió un error al descargar el video de TikTok: ${error}`;
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt'];

export default handler;
