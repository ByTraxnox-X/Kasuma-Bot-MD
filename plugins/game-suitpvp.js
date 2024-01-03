let handler = m => m
handler.before = async function (m) {
let pp = 'https://telegra.ph/file/299ddc1dde0d008cfffaa.jpg'
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|Aceptar|acerta|aceptar|gas|aceptare?|nao|Rechazar|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `@${room.p2.split`@`[0]} Acaba de rechazar el pvp, por lo que el juego sera cancelado`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play' 
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `El juego a comenzado, Las opciones han sido enviadas a los chats privados de @${room.p.split`@`[0]} y de @${room.p2.split`@`[0]}\n\nPorfavor seleccione una opción respectivamente\n\n*Elegir opción en wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let comienzop = `Hola Jugador "1" Debes Seleccionar una de las siguientes opciones\n\nPiedra\nPapel\nTijera\n\n*Responda al mensaje con la opción*`
let comienzop2 = `Hola Jugador "2" Debes Seleccionar una de las siguientes opciones\n\nPiedra\nPapel\nTijera\n\n*Responda al mensaje con la opción*`
   
if (!room.pilih) this.sendMessage(room.p, { text: comienzop }, { quoted: m })  
if (!room.pilih2) this.sendMessage(room.p2, { text: comienzop2 }, { quoted: m })
room.waktu_milih = setTimeout(() => {
let iniciativa = `Ningun jugador a empezado el juego, por lo que tengo que cancelar el juego`                              
if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: iniciativa }, { quoted: m })
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `@${(room.pilih ? room.p2 : room.p).split`@`[0]} No eligistes ninguno opción, termino el pvp`
this.sendMessage(m.chat, { text: textnull }, { quoted: m }, { mentions: this.parseMention(textnull) })
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`Has eligido ${m.text}, Regresa al grupo y ${room.pilih2 ? `*Revisa Los Resultados*` : '*Espera los resultados*'}`) 
if (!room.pilih2) this.reply(room.p2, `El Oponente ya a eligido, ahora te toca a ti`, m, 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`Has eligido ${m.text}, Regresa al grupo y ${room.pilih ? `*Revisa Los Resultados*` : '*Espera los resultados*'}`)
if (!room.pilih) this.reply(room.p, `Ya el exponente eligió una opción, Ahora te toca a ti`, m, 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 

this.reply(room.asal, `Resultado Del PvP\n\n${tie ? 'Uff Empate' : ''} *@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? `Ganastes  ${room.poin} XP*` : ` *Perdió  ${room.poin_lose} XP*`}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? `Ganastes ${room.poin} XP*` : ` *Perdio  ${room.poin_lose} XP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}
