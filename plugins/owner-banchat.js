//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    m.reply('Se desactivo el Bot en este grupo')
}
handler.help = ['desactivarbot']
handler.tags = ['owner']
handler.command = ['desactivarbot', 'chatoff'] 
handler.owner = true

export default handler
 
