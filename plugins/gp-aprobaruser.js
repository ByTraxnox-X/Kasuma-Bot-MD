let handler = async (m, { conn, args, text, usedPrefix, command }) => {

if (!text) return m.reply (` ejemplo: ${usedPrefix + command} numero`)
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
await conn.groupRequestParticipantsUpdate(m.chat, users, 'approve')

}
handler.help = ['aprobarusuario']
handler.tags = ['group']
handler.command = /^(aprueba|aprobarusuario|acepta|aceptar|\+)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
