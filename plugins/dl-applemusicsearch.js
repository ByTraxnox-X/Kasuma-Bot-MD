import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Ingrese el nombre de la canción';
  }

  try {
    const apiUrl = `${apikasu}/api/search/applemusic?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`
> Sin respuesta

Error al buscar la canción en Apple Music`);
    }

    const json = await response.json();

    m.react(rwait);

    const songInfo =`
> Informacion

*Nombre:* ${json.result.name}\n
*Artista:* ${json.result.artist}\n
*Álbum:* ${json.result.album}\n
*Fecha de lanzamiento:* ${json.result.release_date}\n
*Precio:* ${json.result.price}\n
*Duración:* ${json.result.length}\n
*Género:* ${json.result.genre}\n
*Enlace:* ${json.result.url}`

    if (json.result.thumbnail) {
      m.react(done);
      await conn.sendFile(m.chat, json.result.thumbnail, 'thumbnail.jpg', songInfo, m);
    } else {
      m.reply(songInfo);
    }

  } catch (error) {
    console.error(error);
    throw `
> Sin respuesta

Ocurrió un error al procesar la solicitud: ${error.message}`;
  }
};

handler.help = ['applemusicsearch'];
handler.tags = ['dl'];
handler.command = /^(applemusicsearch)$/i;

export default handler;