let handler = async (m, {conn, groupMetadata }) => {
conn.reply(m.chat, `${await groupMetadata.id}`, m)
}
handler.help = ['us']
handler.tags = ['owner']
handler.command = /^(us)$/i
handler.owner = true
handler.group = true

export default handler


//Ehem:v
