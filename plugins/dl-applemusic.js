import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) throw `Ingrese el nombre de la canción.`;
    try {
        const apiURL = `${apikasu}/api/dowloader/apple-music?url=${text}&apikey=${apikeykasu}`;

        const res = await fetch(apiURL);
        const data = await res.json();

        if (!data.status) {
            throw 'Error, no hay resultados';
        }

        const musicInfo = data.result;

        const img = await (await fetch(musicInfo.image)).buffer();

        let appleMusicInfo = `*${musicInfo.name}*\n\n`;
        appleMusicInfo += `*Artistas:* ${musicInfo.artists}\n`;
        appleMusicInfo += `*Duración:* ${musicInfo.duration_ms} ms\n\n`;
        appleMusicInfo += `Enviando...`;

        await conn.sendMessage(m.chat, {
            text: appleMusicInfo.trim(),
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                "externalAdReply": {
                    "showAdAttribution": true,
                    "containsAutoReply": true,
                    "renderLargerThumbnail": true,
                    "title": global.titulowm2,
                    "containsAutoReply": true,
                    "mediaType": 1,
                    "thumbnail": img,
                    "thumbnailUrl": img,
                }
            }
        }, { quoted: m });

        const audioResponse = await fetch(musicInfo.url);
        const audioBuffer = await audioResponse.buffer();

        await conn.sendMessage(m.chat, {
            audio: audioBuffer,
            fileName: `${musicInfo.name}`.mp3,
            mimetype: 'audio/mpeg'
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        throw 'Error, no hay resultados';
    }
};

handler.help = ['applemusic'];
handler.tags = ['dl'];
handler.command = /^(applemusic|amusic)$/i;

export default handler;