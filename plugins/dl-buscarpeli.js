import fetch from 'node-fetch';

let Handler = async (m, { conn, text }) => {
  if (!text) throw 'Ingrese el nombre de la pelicula a buscar'

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`Conexion fallida`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let ratings = json.ratings.map(rating => `*${rating.source}:* ${rating.value}`).join('\n')
    let movieInfo = `\t\t*${json.title}*

*Año:* ${json.year}
*Clasificación:* ${json.rated}
*Fecha de lanzamiento:* ${json.released}
*Duración:* ${json.runtime}
*Géneros:* ${json.genres}
*Director:* ${json.director}
*Guionista:* ${json.writer}
*Actores:* ${json.actors}
*Argumento:* ${json.plot}
*Idiomas:* ${json.languages}
*País:* ${json.country}
*Premios:* ${json.awards}
*Metascore:* ${json.metascore}
*Calificación:* ${json.rating}
*Votos:* ${json.votes}
*ID de IMDB:* ${json.imdbid}
*Tipo:* ${json.type}
*DVD:* ${json.dvd}
*Taquilla:* ${json.boxoffice}
*Producción:* ${json.production}
*Sitio web:* ${json.website}
*Calificaciones:*${ratings}`

    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m);
  } catch (error) {
    console.error(error);
  }
};

Handler.help = ['buscarpeli'];
Handler.tags = ['dl'];
Handler.command = /^(buscarpeli|movie)$/i;

export default Handler;
