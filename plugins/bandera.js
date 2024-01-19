import fs from 'fs'

let timeout = 180000

let handler = async (m, { conn, usedPrefix }) => {
    let banderasJSON = JSON.parse(fs.readFileSync("./src/game/banderas.json"))
    let randomFlag = banderasJSON[Math.floor(Math.random() * banderasJSON.length)]
    let country = randomFlag.pais
    let flagURL = randomFlag.foto
    let caption = `
🚩 *Adivina la Bandera*

¿De qué país es esta bandera? (${country})

*Tienes ${timeout/1000} segundos para responder*.
`.trim()
    conn.sendMessage(m.chat, { url: flagURL }, 'imageMessage', { caption: caption })
    conn.banderas = conn.banderas || {}
    conn.banderas[m.chat] = [
      country,
      flagURL,
      setTimeout(() => {
        if (conn.banderas[m.chat]) {
          conn.reply(m.chat, `Se acabó el tiempo. La respuesta correcta era ${country}. ¡Inténtalo de nuevo!`, m)
          delete conn.banderas[m.chat]
        }
      }, timeout)
    ]
}

handler.help = ['adivina']
handler.tags = ['game']
handler.command = /^(adivina|adivinabandera|bandera)$/i

export default handler