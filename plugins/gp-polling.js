let handler = async (m, {
    conn,
    text,
    args,
    command,
    sender
}) => {

    let question = text.replace(/:.*/,'').trim()
    if (!question) {
        throw "Por favor, haz una pregunta para la encuesta"
    }
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let cap = `*Encuesta hecha por:* ${m.name}\n*Encuesta:* ${text}`
    const pollMessage = {
        name: cap,
        values: ["Sí", "No", "Tal vez"],
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