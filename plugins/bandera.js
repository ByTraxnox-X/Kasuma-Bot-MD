import fetch from 'node-fetch';
import fs from 'fs';

let timeout = 5000;
let poin = 10000;

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const apiUrl = 'https://api-kasu.onrender.com/api/game/bandera?apikey=79242cc3';

    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '¡Todavía hay un juego sin terminar!', conn.tekateki[id][0]);
        throw false;
    }

    let user = global.db.data.users[m.sender] || {};
    let userWait = user.wait || 0;
    let timeout = userWait + 40000;
    let textos = `*Adivina el nombre de la bandera de la foto*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo!`.trim();

    conn.tekateki[id] = true;

    const response = await fetch(apiUrl);
    const data = await response.json();

    conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m);

    setTimeout(async () => {
        if (conn.tekateki[id]) {
            await conn.reply(m.chat, `¡Se acabó el tiempo!, intenta resolver de nuevo.`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }
    }, timeout);

    user.wait = new Date() * 1;
    user.poin = (user.poin || 0) + poin;
    global.db.data.users[m.sender] = user;
};

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i;

export default handler;
