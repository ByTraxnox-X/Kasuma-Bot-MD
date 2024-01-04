let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.caracruzpvp = global.caracruzpvp ? global.caracruzpvp : {}
let handler = async (m, { conn, usedPrefix, command, text }) => {
//let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
if (Object.values(conn.caracruzpvp).find(room => room.id.startsWith('caracruzpvp') && [room.p, room.p2].includes(m.sender))) throw `Termina Tu Partida Primero`
let textquien = `Etiqueta a la persona que quieres desafiar\n\n*Ejemplo:*\n${usedPrefix + command} @`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {quoted: m }, { mentions: conn.parseMention(textquien)})
if (Object.values(conn.caracruzpvp).find(room => room.id.startsWith('caracruzpvp') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `La persona que quieres desafíar esta en otra partida, espera a que termine de jugar`
let id = 'caracruzpvp_' + new Date() * 1
let caption = `🎮👾 CARA O CRUZ PVP 🎮👾\n\n@${m.sender.split`@`[0]} Desafia a @${m.mentionedJid[0].split`@`[0]} a un (cara o cruz pvp) de cara o cruz\n\n_*Escribe (aceptar) para aceptar*_\n_*Escribe (rechazar) para rechazar*_`
conn.caracruzpvp[id] = {
chat: await conn.sendMessage(m.chat, { text: caption }, {mentions: conn.parseMention(caption)}),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.caracruzpvp[id]) conn.reply(m.chat, `⏳ Tiempo De Espera Finalizado, El Cara o Cruz PvP Se Cancela Por Falta De Respuesta`, m)
  
delete conn.caracruzpvp[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}}
handler.help = ['caracruzpvp']
handler.tags = ['game']
handler.command = /^(caracruzpvp)$/i
handler.group = true
handler.game = true
export default handler