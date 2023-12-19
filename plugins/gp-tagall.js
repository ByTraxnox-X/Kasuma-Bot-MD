let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`Grupo: *${groupMetadata.subject}*\nMiembros: *${participants.length}*${text ? `\nMensaje: ${text}\n` : ''}\n*MENCIONES*\n` + users.map(v => '@' + v.replace(/@.+/, '')).join`\n` + '\n', null, {
        mentions: users
    })
}

handler.help = ['todos']
handler.tags = ['group']
handler.command = ['todos']
handler.admin = true
handler.group = true

export default handler
