import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona un texto para enviar a la API.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://vihangayt.me/stalk/ip?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.data) {
      const {
        continent,
        country,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        currency,
        isp,
        org,
        as,
        reverse,
        mobile,
        proxy,
        hosting,
        ip,
        cached,
        cacheTimestamp,
      } = data.data;

      const mensaje = `\t\t*${text}*\n\n` +
        `*Continente:* ${continent}\n\n` +
        `*País:* ${country}\n` +
        `*Región:* ${regionName}\n` +
        `*Ciudad:* ${city}\n` +
        `*Código Postal:* ${zip}\n` +
        `*Latitud:* ${lat}\n` +
        `*Longitud:* ${lon}\n` +
        `*Zona Horaria:* ${timezone}\n` +
        `*Moneda:* ${currency}\n` +
        `*ISP:* ${isp}\n` +
        `*Organización:* ${org}\n` +
        `*AS:* ${as}\n` +
        `*Reverse DNS:* ${reverse}\n` +
        `*Móvil:* ${mobile}\n` +
        `*Proxy:* ${proxy}\n` +
        `*Hosting:* ${hosting}\n` +
        `*Dirección IP:* ${ip}\n` +
        `*En caché:* ${cached}\n` +
        `*Marca de tiempo de caché:* ${cacheTimestamp}`;

      conn.reply(m.chat, mensaje, m);
    } else {
      throw 'No se pudo obtener una respuesta válida de la API.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['ipinfo'];
handler.tags = ['tools'];
handler.command = /^ipinfo$/i;

export default handler;
