//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `Etiqueta o menciona al usuario para desbanear`
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat, `
DESBANEO


@${who.split`@`[0]} ha sido desbaneado`, m, { mentions: [who] })
}
handler.help = ['unbanbot @user']
handler.tags = ['owner']
handler.command = /^unbanbot$/i
handler.rowner = true

export default handler
