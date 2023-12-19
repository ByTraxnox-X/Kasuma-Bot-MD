//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner} ) => {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = false
    m.reply('Bot activo  en este grupo')   
}
handler.help = ['activarbot']
handler.tags = ['owner']
handler.command = ['chaton', 'activarbot'] 

export default handler
