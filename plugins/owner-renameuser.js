//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Taguea al usuario'
    
    let newName = text.replace('@' + who.split`@`[0], '').trim()
    if (!newName) throw 'Ingresa el nuevo nombre de usuario'
    
    let users = global.db.data.users
    if (!users[who]) throw 'Usuario no encontrado en la base de datos'
    
    users[who].name = newName // Cambia el nombre de usuario
    
    await m.reply(`Nombre de usuario cambiado a: *${newName}*`)
}

handler.help = ['nuevonombre @tag']
handler.tags = ['owner']
handler.command = ['nuevonombre'] 
handler.rowner = true

export default handler
