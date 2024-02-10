import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Por favor, proporciona una IP.';
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apikasu}/api/tools/ip?ip=${text}&apikey=${apikeykasu}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status && data.result) {
      const {
        country,
        countryCode,
        region,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        isp,
        org,
        as,
        query
      } = data.result;

      let msg = `\t\t*${query}*\n\n` +
        `*País:* ${country}\n` +
        `*Codigo de pais:* ${countryCode}\n` +
        `*Codigo de la region:* ${region}\n` +
        `*Nombre de la Region:* ${regionName}\n` +
        `*Ciudad:* ${city}\n` +
        `*zip:* ${zip}\n` +
        `*Latitud:* ${lat}\n` +
        `*Longitud:* ${lon}\n` +
        `*Zona Horaria:* ${timezone}\n` +
        `*ISP:* ${isp}\n` +
        `*Organización:* ${org}\n` +
        `*AS:* ${as}\n` +

      m.reply(msg)
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
