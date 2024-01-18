import fs from 'fs'
import { sticker } from '../lib/sticker.js'

let timeout = 10000
let poin = 5000

let handler = async (m, { conn, usedPrefix }) => {
    conn.bandera = conn.bandera ? conn.bandera : {}
    let id = m.chat
    if (id in conn.bandera) {
        conn.reply(m.chat, 'Todavía hay un juego sin terminar!', conn.bandera[id][0])
        throw false
    }
    let bandera = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let json = bandera[Math.floor(Math.random() * bandera.length)]
    let stickerFile = fs.readFileSync(json.foto)
await conn.sendFile(m.chat, stickerFile, 'sticker.png', '')
    
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `*País*: *"${json.pais}"*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre correcto y bien escrito!
`.trim()
    conn.bandera[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.bandera[id]) await conn.reply(m.chat, `¡Se acabó el tiempo, inténtalo de nuevo! `, conn.bandera[id][0])
            delete conn.bandera[id]
        }, timeout)
    ]
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler