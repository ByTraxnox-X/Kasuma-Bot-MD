let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    m.reply(`*Usuarios registrados:* ${totalreg}`)
}
handler.help = ['usuarios']
handler.tags = ['owner']
handler.command = /^(usuarios)$/i

handler.owner = true
export default handler

