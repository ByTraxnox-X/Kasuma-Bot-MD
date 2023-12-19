//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('Se estableció el mensaje de despedida')
  } else throw `Ingrese el mensaje\n@user (mención)`
}
handler.help = ['avisodespedida <text>']
handler.tags = ['group']
handler.command = ['avisodespedida'] 
handler.admin = true
handler.owner = false

export default handler
