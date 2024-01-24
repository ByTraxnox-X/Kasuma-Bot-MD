import fetch from 'node-fetch';

const imageUrl = './src/api.png'; 

const handler = async (m, { conn }) => {
  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `${apivisionary}/status`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data) {
      const { uptime, latencia, totalRequests, totalVisitors, creator, phoneNumber } = data;

      const mensaje = `\t\t*Estado de la API:*
      
*API:* ${apivisionary}
*Uptime:* ${uptime}
*Latencia:* ${latencia}
*Total de Solicitudes:* ${totalRequests}
*Total de Visitantes:* ${totalVisitors}
*Creador:* ${creator}
*Número de Teléfono:* ${phoneNumber}`;

conn.sendMessage(m.chat,{image: {url: imageUrl}, caption: mensaje}, {quoted: m}) 
    } else {
      throw 'No se pudieron obtener los datos del estado de la API.';
    }
  } catch (error) {
    throw `Ocurrió un error: ${error}`;
  }
};

handler.help = ['apistatus'];
handler.tags = ['main'];
handler.command = /^apistatus$/i;

export default handler;
