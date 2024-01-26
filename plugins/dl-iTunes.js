import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        throw 'Ingrese el nombre de la canción';
    }

    try {
        const apiUrl = `https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error al buscar la canción en Apple Music`);
        }

        const json = await response.json();

        m.react(rwait);

        const songInfo =
            `*${json.name}*\n\n` +
            `*Nombre:* ${json.name}\n` +
            `*Artista:* ${json.artist}\n` +
            `*Álbum:* ${json.album}\n` +
            `*Fecha de lanzamiento:* ${json.release_date}\n` +
            `*Precio:* ${json.price}\n` +
            `*Duración:* ${json.length}\n` +
            `*Género:* ${json.genre}\n` +
            `*Enlace:* ${json.url}`;

        if (json.thumbnail) {
            m.react(done);
            await conn.sendFile(m.chat, json.thumbnail, 'thumbnail.jpg', songInfo, m);
        } else {
            m.reply(songInfo);
        }

    } catch (error) {
        console.error(error);
        throw `Ocurrió un error al procesar la solicitud: ${error.message}`;
    }
};

handler.help = ['applemusic'];
handler.tags = ['dl'];
handler.command = /^(applemusic)$/i;

export default handler;
