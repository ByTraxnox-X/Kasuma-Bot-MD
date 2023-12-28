import fetch from 'node-fetch' 
let { areJidsSameUser } = (await import(global.baileys)).default
let handler = async (m, { conn, text, participants, groupMetadata }) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
var number = text.split`@`[1]

if(!text && !m.quoted) return await conn.reply(m.chat, `${mg} Etiqueta a la persona que quiera que sea tu pareja`, m)
	
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

if(!users) return await conn.reply(m.chat, `No se encontró a la persona, la persona debe ser de este grupo.`, m)

	
if(user === m.sender) return  await conn.reply(m.chat, `Tu mismo no puedes ser pareja JAJAJAJ`, m)

if(user === conn.user.jid) return await conn.reply(m.chat, `El bot no puede ser tu pareja JAJJA`, m)

if(global.db.data.users[user].pasangan != m.sender){ 
return await conn.reply(m.chat, `no puedes aceptar si nadie se te a declarado JAJAJA, Declarate con *${tu}* Para que diga si, te acepto o te rechaza`, m, { contextInfo: { mentionedJid: [user, tu]}})	

	
}else{
global.db.data.users[m.sender].pasangan = user
return await conn.reply(m.chat, `Felicidades!!! *${tu}*\nAhora Ustedes Estan En Una Relación Oficial\n\nOjala y dure por siempre su amor`, m, { contextInfo: { mentionedJid: [user, tu, yo]}})	

}}}

handler.help = ['aceptar'];
handler.tags = ['rol'];
handler.command = /^(aceptar|acepto|accept)$/i
handler.group = true
export default handler
