import fs from 'fs';

let timeout = 180000;
let poin = 10000;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay juegos sin responder en este chat', conn.tekateki[id][0]);
        throw false;
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/casos.json`));
    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    let _clue = String(json.response);
    let clue = _clue.replace(/[A-Za-z]/g, '_');
    let caption = `*${json.caso}*

*Sospechosos:*
${json.sospechosos}\n

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda contestar con el nombre completo!
`.trim();

    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        { response: json.response },
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }, timeout)
    ];
};

handler.help = ['casocriminal'];
handler.tags = ['game'];
handler.command = /^(caso|casocriminal|casopoliciaco|casoinvestigar)$/i;
handler.register = true;

export default handler;
