import fetch from 'node-fetch';
import fs from 'fs';

let timeout = 110000;
let poin = 10000;

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const apiUrl = 'https://skizo.tech/api/game/tebakbendera?apikey=kasumabot';

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
*Nota: Pusimos 2 minutos para poder visualizar la imagen bien ya que esta borrosa, estamos mejorando eso, en muy poco tiempo estará lista con foto hd*

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

    // Escucha la respuesta del usuario
    const responseHandler = (msg) => {
        if (msg.fromMe) return;
        if (msg.text) {
            const respuestaCorrecta = data.name.toLowerCase(); // Asumiendo que la respuesta correcta está en minúsculas
            const respuestaUsuario = msg.text.toLowerCase();
            
            if (respuestaUsuario === respuestaCorrecta) {
                conn.reply(m.chat, `¡Correcto! Has adivinado la bandera. +${poin} Exp`, conn.tekateki[id][0]);
                delete conn.tekateki[id];
            } else {
                conn.reply(m.chat, `Respuesta incorrecta, ¡inténtalo de nuevo!`, conn.tekateki[id][0]);
            }
        }
        // Puedes agregar más lógica para otros tipos de mensajes si es necesario
    };

    // Escucha mensajes entrantes durante el juego
    conn.on('message-new', responseHandler);
};

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i;

export default handler;
