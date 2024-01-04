let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.suit = global.suit ? global.suit : {}
let handler = async (m, { conn, usedPrefix, command, text }) => {
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw `Termina Tu Partida Primero`
let textquien = `Etiqueta a la persona que quieres desafiar\n\n*Ejemplo:*\n${usedPrefix + command} @`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {quoted: m }, { mentions: conn.parseMention(textquien)})
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `La persona que quieres desafíar esta en otra partida, espera a que termine de jugar`
let id = 'suit_' + new Date() * 1
let caption = `🎮👾 GAMES - PVP - GAMES 🎮👾\n\n@${m.sender.split`@`[0]} Desafia a @${m.mentionedJid[0].split`@`[0]} a un (pvp) de pierdra, papel o tijera\n\n_*Escribe (aceptar) para aceptar*_\n_*Escribe (rechazar) para rechazar*_`
let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
conn.suit[id] = {
chat: await conn.sendMessage(m.chat, { text: caption }, {mentions: conn.parseMention(caption)}),
//await conn.sendButton(m.chat, caption, footer, imgplaygame, [[`Aceptar`], [`Rechazar`]], null, {mentions: conn.parseMention(caption)}),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, `⏳ Tiempo De Espera Finalizado, El PvP Se Cancela Por Falta De Respuesta`, m)
  
delete conn.suit[id]
}, timeout), poin, poin_lose, poin_bot, timeout
}}
handler.help = ['pptpvp']
handler.tags = ['game']
handler.command = /^(pptpvp)$/i
handler.group = true
handler.game = true
export default handler