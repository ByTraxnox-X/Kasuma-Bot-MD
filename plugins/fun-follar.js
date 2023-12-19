
let handler = async (m, { conn, command, text }) => {
    if (!text) throw `*Ingrese el @ o el nombre de la persona que quieras saber si te puedes ${command.replace('how', '')}*`
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender

    m.reply(`🔥 *Acabas de follartel@!* 🔥

*Te acabas de follar a la perra de* *${text}* *a 4 patas mientras te gemia como una maldita perra "Aaah.., Aaah, sigue, no pares, no pares.." y la has dejado tan reventada que no puede sostener ni su propio cuerpo la maldita zorra!*

*${text}* 
🔥 *YA TE HAN FOLLADO!* `, null, { mentions: [user] })
}
handler.help = ['follar @tag']
handler.tags = ['fun']
handler.command = /^(Follar|violar)/i

export default handler
