let handler = async (m, {
    conn,
    text,
    args,
    command,
    sender
}) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    let question = text.replace(/:.*/,'').trim()
    if (!question) {
        throw "Por favor, haz una pregunta para la encuesta"
    }

    const pollMessage = {
        name: `Encuesta Realizada Por ${users}:\n\n *${question}*`,
        values: ["Sí", "No"],
        multiselect: false,
        selectableCount: 1
    }

    await conn.sendMessage(m.chat, {
        poll: pollMessage
    })
}

handler.help = ['encuesta <pregunta>']
handler.tags = ['group'] 
handler.command = ['poll', 'encuesta', 'polling'] 
handler.group = true

export default handler