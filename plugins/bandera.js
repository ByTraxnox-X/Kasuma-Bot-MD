
import fs from 'fs'

let timeout = 180000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.banderas = conn.banderas ? conn.banderas : {}
    let id = m.chat
    if (id in conn.banderas) {
        conn.reply(m.chat, 'Todavía hay un juego sin terminar!', conn.banderas[id][0])
        throw false
    }
    let banderas = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let randomFlag = banderas[Math.floor(Math.random() * banderas.length)]
    let country = randomFlag.country
    let flagURL = randomFlag.foto
    let caption = `
🚩 *Adivina la Bandera*

¿De qué país es esta bandera? (${pais})

*Tienes ${timeout/1000} segundos para responder*.
`.trim()
    conn.banderas[id] = [
       await conn.sendFile(m.chat, flagURL, 'bandera.png', caption, m),
       randomFlag,
       setTimeout(async () => {
            if (conn.banderas[id]) await conn.reply(m.chat, `Se acabó el tiempo. La respuesta correcta era ${country}. Inténtalo de nuevo.`, conn.banderas[id][0])
            delete conn.banderas[id]
        }, timeout)
    ]
}

handler.help = ['adivina']
handler.tags = ['game']
handler.command = /^(adivina|adivinabandera|bandera)$/i

export default handler