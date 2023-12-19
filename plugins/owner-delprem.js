//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    let user = global.db.data.users[who]
    if (!who) return m.reply(`Menciona al usuario\n\n*Ejemplo* :\n${usedPrefix + command} @tag`)
    if (!global.prems.includes(who.split`@`[0])) throw 'El usuario no es Premium'
    let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
    global.prems.splice(index, 1)
    conn.reply(m.chat, `Premium removido \n\n@${who.split('@')[0]} Ya no eres premium`, m, { mentions: [who] })
    
}
handler.help = ['nopremium @user']
handler.tags = ['owner']
handler.command = ['nopremium', 'delpremium'] 

handler.group = true
handler.rowner = true

export default handler
