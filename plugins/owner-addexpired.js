let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0] || isNaN(args[0])) throw `Ingrese un número que represente el número de minutos!\n\nEjemplo :\n*${usedPrefix + command}* 30`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var nMinutes = 60000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += nMinutes
    else global.db.data.chats[who].expired = now + nMinutes
    let teks = `Se estableció el tiempo de expiración para \n*${await conn.getName(who)}* \n\n*Durante:* ${args[0]} Minutos\n\n*Cuenta regresiva :* ${msToDate(global.db.data.chats[who].expired - now)}`
    conn.reply(m.chat, teks, m)
}

handler.help = ['expirar <minutos>']
handler.tags = ['owner']
handler.command = /^(expirar|addexpired)$/i
handler.rowner = true

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Días*\n ', h, ' *Horas*\n ', m, ' *Minutos*\n ', s, ' *Segundos* '].map(v => v.toString().padStart(2, 0)).join('')
}

export default handler
