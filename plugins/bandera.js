import { sticker } from '../lib/sticker.js'
import fs from 'fs'

let timeout = 40000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.bandera = conn.bandera ? conn.bandera : {}
    let id = m.chat
    if (id in conn.bandera) {
        conn.reply(m.chat, 'Todavia hay un juego sin terminar!', conn.bandera[id][0])
        throw false
    }
    let bandera = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let json = bandera[Math.floor(Math.random() * bandera.length)]
    let _clue = json.emoji
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `
ⷮ *Adivina la bandera de este pais:*\n*"${jsonfile.pais}"*


*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con emoji la bandera!
`.trim()
    conn.bandera[id] = [


/*const c = await conn.sendFile(m.chat, await sticker(json.img, "", ""), "", "", m)
                conn.bandera[id] = [
                        await conn.reply(m.chat, caption, c, m),*/




     await conn.reply(m.chat, caption, m),


        json, poin,
        setTimeout(async () => {
            if (conn.bandera[id]) await conn.reply(m.chat, `Se acabó el tiempo!.`, conn.bandera[id][0])
            delete conn.bandera[id]
        }, timeout)
    ]
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|adivinalabandera|adivinalasbandera|advbandera)$/i

export default handler