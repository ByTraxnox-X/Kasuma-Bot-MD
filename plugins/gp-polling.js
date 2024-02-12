let handler = async (m, {
    conn,
    text,
    args,
    command
}) => {
    // Obtener la pregunta de la encuesta
    let question = text.toLowerCase().includes("quieren") ? text.split("quieren")[1].trim() : text.trim()
    if (!question) {
        throw "Por favor, haz una pregunta para la encuesta"
    }

    // Crear el mensaje de la encuesta
    const pollMessage = {
        name: question,
        values: ["Sí", "No"],
        multiselect: false,
        selectableCount: 1
    }

    // Enviar el mensaje de la encuesta al chat
    await conn.sendMessage(m.chat, {
        poll: pollMessage
    })
}

handler.help = ['encuesta <pregunta>']
handler.tags = ['group'] 
handler.command = ['poll', 'encuesta', 'polling'] 
handler.group = true

export default handler