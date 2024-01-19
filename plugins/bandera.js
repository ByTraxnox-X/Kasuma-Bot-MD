
import fs from 'fs'

let timeout = 10000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki || {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, '¡Todavía hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }

    let tekateki = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let clue = json.response.replace(/[A-Za-z]/g, '_')
    let caption = `*Adivina el país de la siguiente bandera*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo del país!`.trim()
    
    conn.tekateki[id] = [
        await conn.sendFile(m.chat, json.image, 'bandera.jpg', caption, m, false }),

      

        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Se acabó el tiempo!.`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler