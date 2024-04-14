import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) throw `Ingrese el URL de la canción de Amazon Music.`;
    try {
        const apiURL = `${apikasu}/api/dowloader/amazon-music?url=${text}&apikey=${apikeykasu}`;
        const res = await fetch(apiURL);
        const data = await res.json();
        if (!data.status) {
            throw `
> Sin respuesta

Error, no hay resultados`;
        }
        const musicInfo = data.result;
        const img = await (await fetch(musicInfo.image)).buffer();
        const appleMusicInfo = `
> Informacion

*Título:* ${musicInfo.name}\n
*Artistas:* ${musicInfo.artists}\n`;
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
            fileName: `${musicInfo.name}.mp3`,
            mimetype: 'audio/mpeg'
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        throw `
> Sin respuesta

Error, no hay resultados`;
    }
};
handler.help = ['amazonmusic'];
handler.tags = ['dl'];
handler.command = /^(amazonmusic|amazon)$/i;

export default handler;
