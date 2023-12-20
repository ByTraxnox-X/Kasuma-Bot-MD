import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Ingrese el nombre de la cancion';

  try {
    let res = await fetch(`${apivisionary}/api/itunes?text=${encodeURIComponent(text)}`);

    if (!res.ok) {
      throw new Error(`Error`);
    }

    let json = await res.json();

    console.log('JSON response:', json);
    m.react(rwait)

let songInfo = 
`\t\t*${json.name}*

*Nombre:* ${json.name}
*Artista:* ${json.artist}
*Album:* ${json.album}
*Fecha de lanzamiento:* ${json.release_date}
*Precio:* ${json.price}
*Duracion:* ${json.length}
*Genero:* ${json.genre}
*Enlace:* ${json.url}`;

    if (json.thumbnail) {
      m.react(done)
      await conn.sendFile(m.chat, json.thumbnail, 'thumbnail.jpg', songInfo, m);
    } else {
      m.reply(songInfo);
    }

  } catch (error) {
    console.error(error);
  }
};

handler.help = ['applemusic'];
handler.tags = ['dl'];
handler.command = /^(applemusic)$/i;

export default handler;
