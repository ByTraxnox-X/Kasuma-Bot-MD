let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, '*Adios a todos, el Bot se despide*') 
await conn.groupLeave(id)}
handler.help = ['salirdelgrupo']
handler.tags = ['owner']
handler.command = /^(out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true
export default handler
