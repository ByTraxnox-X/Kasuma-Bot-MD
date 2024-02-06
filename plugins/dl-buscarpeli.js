import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Ingrese el nombre de la película a buscar';
  }

  try {
    const apiUrl = `${apikasu}/api/search/movieinfo?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Conexión fallida');
    }

    const data = await response.json();

    console.log('JSON response:', data);

    const ratings = data.result.ratings.map(rating => `*${rating.source}:* ${rating.value}`).join('\n');

    const movieInfo = `
*${data.result.title}*\n
*Año:* ${data.result.year}
*Clasificación:* ${data.result.rated}
*Fecha de lanzamiento:* ${data.result.released}
*Duración:* ${data.result.runtime}
*Géneros:* ${data.result.genres}
*Director:* ${data.result.director}
*Guionista:* ${data.result.writer}
*Actores:* ${data.result.actors}
*Argumento:* ${data.result.plot}
*Idiomas:* ${data.result.languages}
*País:* ${data.result.country}
*Premios:* ${data.result.awards}
*Metascore:* ${data.result.metascore}
*Calificación:* ${data.result.rating}
*Votos:* ${data.result.votes}
*ID de IMDB:* ${data.result.imdbid}
*Tipo:* ${data.result.type}
*DVD:* ${data.result.dvd}
*Taquilla:* ${data.result.boxoffice}
*Producción:* ${data.result.production}
*Sitio web:* ${data.result.website}
*Calificaciones:*${ratings}
    `;

    await conn.sendFile(m.chat, data.result.poster, 'poster.jpg', movieInfo, m);
  } catch (error) {
    console.error(error);
    throw `Ocurrió un error: ${error.message}`;
  }
};

handler.help = ['buscarpeli'];
handler.tags = ['dl'];
handler.command = /^(buscarpeli|movie)$/i;

export default handler;