let handler = async (m, { conn }) => { 
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let romper = global.db.data.users[m.sender].pasangan
var ayg = global.db.data.users[m.sender]
var beb = global.db.data.users[global.db.data.users[m.sender].pasangan]

if(ayg.pasangan == ""){
return await conn.reply(m.chat, `Usted *${name}* No tiene pareja`, m,  m)    
}
      
if (typeof beb == "undefined"){
await conn.reply(m.chat, `${name}* 💔 Rampio definitivamente con *${await conn.getName(romper)}*\n✩ Wa.me/${global.db.data.users[m.sender].pasangan.split('@')[0]}*\n\n${wm}`, m, m, { contextInfo: { mentionedJid: [ m.sender, romper ]}}) 
ayg.pasangan = ""
}

if (m.sender == beb.pasangan){
await conn.reply(m.chat, `*${name}* 💔 Rompio definitivamente con *${await conn.getName(romper)}*\n✩ Wa.me/${global.db.data.users[m.sender].pasangan.split('@')[0]}\n\n${wm}`, m, m, { contextInfo: { mentionedJid: [ m.sender, romper ]}}) 
ayg.pasangan = ""
beb.pasangan = ""
}else {
await conn.reply(m.chat, `Usted *${name}* No tiene pareja`, m,  m)    
}}


handler.command = /^(cortar|romper|finish|terminar)$/i
handler.group = true

export default handler
