import fetch from 'node-fetch';
import fs from 'fs';

let timeout = 110000
let poin = 10000

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const apiUrl = 'https://skizo.tech/api/game/tebakbendera?apikey=kasumabot';

conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavia hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }

    let timeout = global.db.data.users[m.sender].wait + 40000;
    let textos = `*Adivina el nombre de la bandera de la foto*
*Nota: Pusimos 2 minutos para poder visualizar la imagen bien ya que esta borrosa, estamos mejorando eso, en muy poco tiempo estara lista con foto hd*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo!`.trim()

  /*  if (args[0] && args[0].toLowerCase() === 'jugar') {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Envía la imagen de la bandera al usuario
            conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m);

            // Almacena la respuesta correcta en la base de datos del usuario
            global.db.data.users[m.sender].answer = data.name.toLowerCase();
        } catch (error) {
            console.error(error);
            conn.reply(m.chat, 'Hubo un error al obtener la bandera. Inténtalo de nuevo más tarde.', m);
        }
    } */
    
    conn.tekateki[id] = [
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
        conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m);
    
    json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!, intenta resolver de nuevo.`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)

    global.db.data.users[m.sender].wait = new Date() * 1;
    ]
};


handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler