

import axios from 'axios';

let timeout = 180000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }
    try {
        let res = await axios.get('https://apikasu.onrender.com/api/game/bandera?apikey=SebastianDevelop');
        let json = res.data;
        let imageUrl = json.img;
        let caption = `
ⷮ *Bandera Mystery*

Adivina la bandera de qué país es esta?

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp
`.trim();
        conn.tekateki[id] = [
            await conn.sendFile(m.chat, imageUrl, 'bandera.jpg', caption, m),
            json, poin,
            setTimeout(async () => {
                if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!, intenta adivinar la bandera de nuevo.`, conn.tekateki[id][0])
                delete conn.tekateki[id]
            }, timeout)
        ]
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, 'Ocurrió un error al cargar la bandera. Inténtalo de nuevo más tarde.', m)
    }
}

handler.help = ['bandera']
handler.tags = ['game']
handler.command = /^(bandera|adivinarbandera|flag)$/i

export default handler
