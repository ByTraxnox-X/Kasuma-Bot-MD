
let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `Etiqueta o menciona a alguien\n\nEjemplo: ${usedPrefix + command} @user`
        if (!(who in global.db.data.users)) throw `El usuario no se encuentra en mi base de datos`
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`
*Usuario Advertido* 

*Admin:* ${name}
*Usuario:* @${who.split`@`[0]}
*Warns:* ${warn + 1}/${war}
*Razon:* ${text}`, null, { mentions: [who] }) 
            m.reply(`
*ADVERTENCIA*
Recibiste una advertencia de un admin

*Warns:* ${warn + 1}/${war} 
Si recibes *${war}* advertencias serás eliminado automáticamente del grupo`, who)
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`El usuario superó las *${war}* advertencias por lo tanto será eliminado`)
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
            m.reply(`Fuiste eliminado del grupo *${groupMetadata.subject}* porque ha sido advertido *${war}* veces`, who)
        }
}
handler.help = ['advertencia @user']
handler.tags = ['group']
handler.command = ['advertencia'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
