
let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `El usuario no se encuentra en mi base de datos`
    conn.reply(m.chat, `
 *BALANCE* 
 *Nombre:* @${who.split('@')[0]}
 *Diamantes*: ${user.diamond}
 *Dólares:* ${user.dolares} 
 *XP:* Total ${user.exp}


*NOTA:* 
Puedes comprar diamantes usando los comandos
 *${usedPrefix}comprar <cantidad>*
 *${usedPrefix}buyall*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 

export default handler
