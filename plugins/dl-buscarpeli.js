import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Ingrese el nombre de la película a buscar';
  }

  try {
    const apiUrl = `https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Conexión fallida');
    }

    const data = await response.json();

    console.log('JSON response:', data);

    const ratings = data.ratings.map(rating => `*${rating.source}:* ${rating.value}`).join('\n');

    const movieInfo = `
*${data.title}*\n
*Año:* ${data.year}
*Clasificación:* ${data.rated}
*Fecha de lanzamiento:* ${data.released}
*Duración:* ${data.runtime}
*Géneros:* ${data.genres}
*Director:* ${data.director}
*Guionista:* ${data.writer}
*Actores:* ${data.actors}
*Argumento:* ${data.plot}
*Idiomas:* ${data.languages}
*País:* ${data.country}
*Premios:* ${data.awards}
*Metascore:* ${data.metascore}
*Calificación:* ${data.rating}
*Votos:* ${data.votes}
*ID de IMDB:* ${data.imdbid}
*Tipo:* ${data.type}
*DVD:* ${data.dvd}
*Taquilla:* ${data.boxoffice}
*Producción:* ${data.production}
*Sitio web:* ${data.website}
*Calificaciones:*${ratings}
    `;

    await conn.sendFile(m.chat, data.poster, 'poster.jpg', movieInfo, m);
  } catch (error) {
    console.error(error);
    throw `Ocurrió un error: ${error.message}`;
  }
};

handler.help = ['buscarpeli'];
handler.tags = ['dl'];
handler.command = /^(buscarpeli|movie)$/i;

export default handler;
