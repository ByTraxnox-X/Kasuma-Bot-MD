import fetch from 'node-fetch'  
//import { areJidsSameUser } from '@adiwajshing/baileys'
let { areJidsSameUser } = (await import(global.baileys)).default
let handler = async (m, { conn, text, participants, groupMetadata }) => {




let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
var number = text.split`@`[1]

if(!text && !m.quoted) return await conn.reply(m.chat, `${mg} Etiqueta a la persona que quiera que sea tu pareja`, m,  m)

	
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = conn.getName(m.quoted.sender)
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}  
} catch (e) {
} finally {
	
let users = m.isGroup ? participants.find(v => areJidsSameUser(v.jid == user)) : {}
let yo = conn.getName(m.sender)
let tu = conn.getName(who)

if(!users) return await conn.reply(m.chat, `No se encontró a la persona, la persona debe ser de este grupo.`, m, m)

	
if(user === m.sender) return await conn.reply(m.chat, `Tu mismo no puedes ser pareja JAJAJAJ`, m,  m)

	
if(user === conn.user.jid) return await conn.reply(m.chat, `El bot no puede ser tu pareja JAJJA`, m,  m)

if(global.db.data.users[user].pasangan != m.sender){ 
return await conn.reply(m.chat, `No puedes rechazar a*${tu}* Si ninguno de los 2 se a declarado, Declarate para que diga que si te acepta o te rechaza`, m, m, { contextInfo: { mentionedJid: [user, tu] }})	

	
}else{
global.db.data.users[user].pasangan = ""
return await conn.reply(m.chat, `Lamentablemente *${yo}* Se ha negado a estar en una relación contigo*${tu}*\nNo estes triste aun tienes muchas cosas por hacer`, m, { contextInfo: { mentionedJid: [user, tu, yo]}})	

}}}

handler.help = ['rechazar'];
handler.tags = ['rol'];
handler.command = /^(rechazar|cancelar|decline)$/i
handler.group = true
export default handler
