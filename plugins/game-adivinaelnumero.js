import db from '../lib/database.js'

let handler = async (m, { conn  }) => {
    conn.advnro = conn.advnro ? conn.advnro : {}
    if (conn.advnro[m.chat]) return m.reply('Todavía hay preguntas sin responder en este chat')
    conn.advnro[m.chat] = { number: (9).getRandom(), time: 60000, bonus: 1000, opp: 5
    }
    let teks = `*Adivina el número* 1234567890

Tiempo: ${(conn.advnro[m.chat].time / 1000).toFixed(2)} segundos
Bono: +${conn.advnro[m.chat].bonus} Exp`
    let idmsg = await m.reply(teks)
    setTimeout(() => {
      if (conn.advnro[m.chat]) conn.reply(m.chat, `*Se acabó el tiempo!*
      
Respuesta: ${conn.advnro[m.chat].number}`, m, { quoted: idmsg })
      delete conn.advnro[m.chat]
    }, conn.advnro[m.chat].time)
}

handler.help = ['adivinaelnumero']
handler.tags = ['game']
handler.command = /^(adivinaelnumero)$/i

export default handler