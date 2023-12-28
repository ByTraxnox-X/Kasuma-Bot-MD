/* 
    Made by https://github.com/syahrularranger 
    Jangan di hapus credit nya :)
*/
let timeout = 60000
let poin = 500
let poin_lose = -100
let poin_bot = 200
let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit ? conn.suit : {}
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'Termina tu traje anterior'
  if (!m.mentionedJid[0]) return m.reply(`¿A quién te quieres oponer?_\nEtiqueta a la persona.. Contoh\n\n${usedPrefix}suit @${owner[1]}`, m.chat, { contextInfo: { mentionedJid: [owner[1] + '@s.whatsapp.net'] } })
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `La persona a la que estás desafiando está haciendo el mismo juego que otra persona. :(`
  let id = 'suit_' + new Date() * 1
  let caption2 = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} desafío @${m.mentionedJid[0].split`@`[0]} jugar al traje

Por favor @${m.mentionedJid[0].split`@`[0]} 
`.trim()
  let footer = `Tipo "aceptar/ok/gas" para empezar el traje\nKetik "rechazar/no puedo/más tarde" negarse`
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, caption caption2, m),
    conn.reply(m.chat, `Aceptar "ok" Rechazar "tolak"`, m)
   /* id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',*/
    
    
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Se acabó el tiempo del traje_`, m)
      delete conn.suit[id]
    }, timeout), poin, poin_lose, poin_bot, timeout
  }
}
handler.tags = ['game']
handler.help = ['suitpvp', 'suit']
handler.command = /^suit(pvp)?$/i

handler.group = true
handler.game = true

module.exports = handler