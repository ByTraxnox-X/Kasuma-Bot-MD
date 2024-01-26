import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
    if (!text) {
        throw 'Ingrese el nombre de la canción';
    }

    const apivisionary = "https://visionaryapi.boxmine.xyz/";

    try {
        const apiUrl = `${apivisionary}/api/itunes?text=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error al buscar la canción en Apple Music`);
        }

        const json = await response.json();

        m.react(rwait);

        const songInfo =
            `*${json.message.name}*\n\n` +
            `*Nombre:* ${json.message.name}\n` +
            `*Artista:* ${json.message.artist}\n` +
            `*Álbum:* ${json.message.album}\n` +
            `*Fecha de lanzamiento:* ${json.message.release_date}\n` +
            `*Precio:* ${json.message.price}\n` +
            `*Duración:* ${json.message.length}\n` +
            `*Género:* ${json.message.genre}\n` +
            `*Enlace:* ${json.message.url}`;

        if (json.message.thumbnail) {
            m.react(done);
            await conn.sendFile(m.chat, json.message.thumbnail, 'thumbnail.jpg', songInfo, m);
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
