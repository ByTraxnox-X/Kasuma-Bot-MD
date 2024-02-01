import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Por favor, ingrese un enlace de TikTok.`;

    try {
        const apiUrl = `${apikasu}/api/dowloader/tikok?url=${args[0]}&apikey=${apikeykasu}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            m.react(rwait);

            const data = await response.json();
            const { result } = data;

            if (result.video_HD) {
                const apiUrlVideo = result.video_HD;
                const responseVideo = await fetch(apiUrlVideo);

                if (responseVideo.ok) {
                    let fileBuffer = await responseVideo.buffer();
                    conn.sendFile(m.chat, fileBuffer, 'tiktok.mp4', '', m);
                    m.react(done);
                } else {
                    throw 'No se pudo obtener el video de TikTok en HD.';
                }
            } else if (result.video) {
                const apiUrlVideo = result.video;
                const responseVideo = await fetch(apiUrlVideo);

                if (responseVideo.ok) {
                    let fileBuffer = await responseVideo.buffer();
                    conn.sendFile(m.chat, fileBuffer, 'tiktok.mp4', '', m);
                    m.react(done);
                } else {
                    throw 'No se pudo obtener el video de TikTok.';
                }
            } else if (result.photo) {
                const photos = result.photo;

                for (const photo of photos) {
                    const apiUrlImage = photo.url_download;
                    const responseImage = await fetch(apiUrlImage);

                    if (responseImage.ok) {
                        let fileBuffer = await responseImage.buffer();
                        conn.sendFile(m.chat, fileBuffer, 'tiktok.jpg', '', m);
                    } else {
                        throw 'No se pudo obtener una de las fotos de TikTok.';
                    }
                }

                m.react(done);
            } else {
                throw 'No se encontró la propiedad "video_HD", "video" o "photo" en el resultado.';
            }
        } else {
            throw 'No se pudo obtener el contenido de TikTok.';
        }
    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al descargar el video o las fotos de TikTok: ${error.message}`;
    }
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tiktok', 'tt'];

export default handler;