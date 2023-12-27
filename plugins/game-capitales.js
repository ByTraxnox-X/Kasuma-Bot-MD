import fs from 'fs'

let timeout = 30000
let poin = 1000

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, 'Todavia hay un juego sin terminar!', conn.tekateki[id][0])
        throw false
    }
    let tekateki = JSON.parse(fs.readFileSync("./src/game/capitales.json"))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `
ⷮ *Pais:* ${json.pais}

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

*Responde con el nombre de la ciudad completo!*
`.trim()
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!, intenta descubrir la capital de otro pais.`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['capitalde']
handler.tags = ['game']
handler.command = /^(capitalde|capitales|capital|adivinalacapital)$/i

export default handler
