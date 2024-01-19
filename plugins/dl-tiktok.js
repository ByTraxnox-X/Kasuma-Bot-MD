import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `https://skizo.tech/api/tiktok?url=${args[0]}&apikey=kasumabot`;
        const response = await fetch(apiUrl);
        const data = await response.buffer();
        
        m.react(rwait)

        const fileName = "tiktok.mp4";

        m.react(done)
                 let fileBuffer = await fetch(data.link).then(response => response.buffer());
        conn.sendFile(m.chat, data, fileName, fileBuffer, "", m);
    } catch (error) {
        throw `Ocurrió un error al descargar el video de TikTok: ${error}`;
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt'];

export default handler;
