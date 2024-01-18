import { sticker } from '../lib/sticker.js'

import fs from 'fs'

let timeout = 40000
let poin = 5000

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavía hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }
    let tekateki = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
   /* let stickerFile = fs.readFileSync(json.foto)
await conn.sendFile(m.chat, stickerFile, 'sticker.png', '')*/
    
    let _clue = json.pais
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `*País*: *"${json.pais}"*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre correcto y bien escrito!
`.trim()
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `¡Se acabó el tiempo, inténtalo de nuevo! `, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler