
let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `El usuario no se encuentra en mi base de datos`

    m.react(rwait)

    conn.reply(m.chat, `\t\t*Cartera*

 *Usuario* : @${who.split('@')[0]}
 *Dolares en el Banco central*: ${user.bank}
 *Dolares en la cartera*:  ${user.dolares}`, m, { mentions: [who] })

 m.react('🏦') 

}
handler.help = ['cartera']
handler.tags = ['econ']
handler.command = ['cartera'] 

export default handler
