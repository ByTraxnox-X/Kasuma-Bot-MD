import fs from 'fs'

let timeout = 110000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {

    const apiUrl = 'https://apikasu.onrender.com/api/game/bandera?apikey=SebastianDevelop';
    const name = await fetch(apiUrl);
    const data = await name.json();

    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavia hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }
    let textos = `
ⷮ *Adivina el nombre de la bandera de la foto*
*Nota: Pusimos 2 minutos para poder visualizar la imagen bien ya que esta borrosa, estamos mejorando eso, en muy poco tiempo estara lista con foto hd*


*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo!
`.trim()
    conn.tekateki[id] = [
       
       conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m);
       
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!, intenta resolver de nuevo.`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler