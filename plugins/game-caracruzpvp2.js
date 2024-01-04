let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.caracruzpvp = global.caracruzpvp ? global.caracruzpvp : {}
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (Object.values(conn.caracruzpvp).find(room => room.id.startsWith('caracruzpvp') && [room.p, room.p2].includes(m.sender))) throw `Tienes un juego en curso, terminalo para empezar otro!`
let textquien = `Etiqueta a la persona a desafiar!`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {quoted: m }, { mentions: conn.parseMention(textquien)})
if (Object.values(conn.caracruzpvp).find(room => room.id.startsWith('caracruzpvp') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `La persona a desafiar se encuentra en otro Cara o Cruz, etiquete a otro oponente!`
let id = 'caracruzpvp_' + new Date() * 1
let user1 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
let user2 =  m.sender ? m.sender : m.quoted.sender;
conn.caracruzpvp[id] = {
chat: await conn.sendMessage(m.chat, { text: `*🎮👾 CARA O CRUZ 🎮👾*\n\n@${m.sender.split`@`[0]} ha desafiado a @${m.mentionedJid[0].split`@`[0]} a un enfrentamiento en cara o cruz.\n\n*Para confirmar escribe "aceptar"*\n*si desea rechazar hagalo con "rechazar"*`, mentions:[user1, user2]}),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.caracruzpvp[id]) conn.reply(m.chat, `Tiempo de espera finalizado, vuelvan a crear una sesion si desean jugar.`, m)
  
delete conn.caracruzpvp[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}}
handler.help = ['caracruzpvp']
handler.tags = ['game']
handler.command = /^(caracruzpvp)$/i
handler.group = true
handler.game = true
export default handler