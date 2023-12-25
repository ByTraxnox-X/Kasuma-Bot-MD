let handler = async (m, { conn, text, command, usedPrefix, args }) => {
let pp = 'https://images.app.goo.gl/ScSVL6PDahv4iV2CA'
let time = global.db.data.users[m.sender].wait + 40000
let textos = `CARA O SELLO\n\nPuedes Usar El Comando Usando\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`
if (!args[0]) return await conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, quoted: m })
var pvjuegocs = Math.random()
if (pvjuegocs < 0.50) {//34
  /*  pvjuegocs = 'cara'
} else if (pvjuegocs > 0.50){//34
pvjuegocs = 'cruz' 
}
if (text == pvjuegocs) {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender*/
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 2
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else if (text == 'cara') {
if (pvjuegocs == 'cara') {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 2
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp -= 300
m.reply(`Perdistes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPerdistes: ${[dolares].getRandom()} $`)
}
} else if (text == 'cara') {
if (pvjuegocs == 'cara') {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 3
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp -= 300
m.reply(`Perdistes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPerdistes: ${[dolares].getRandom()} $`)
}
}else if (text == 'cruz') {
if (pvjuegocs == 'cruz') {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 100
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp -= 300
m.reply(`Perdistes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPerdistes: ${[dolares].getRandom()} $`)
}} else if (text == 'cruz') {
if (pvjuegocs == 'cruz') {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 100
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who)  
let dolares = global.db.data.users[m.sender].exp -= 400
m.reply(`Perdistes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPerdistes: ${[dolares].getRandom()} $`)
}
} else if (text == 'cara') {
if (pvjuegocs == 'cara') {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp += 300
m.reply(`Ganastes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`)
} else {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender 
let name = conn.getName(who) 
let dolares = global.db.data.users[m.sender].exp -= 300
m.reply(`Perdistes ${name} Elijistes: ${text}\nResultado: ${pvjuegocs}\nPerdistes: ${[dolares].getRandom()} $`)
}
global.db.data.users[m.sender].wait = new Date * 1
}}
handler.help = ['suerte']
handler.tags = ['games']
handler.command = ['suerte', 'gm'] 
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}