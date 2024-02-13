let handler = async (m, {
  conn,
  text,
  command,
  sender
}) => {
  let user = global.db.data.users[m.sender]
  text = text ? text.trim() : ''
  if (!text) return conn.reply(m.chat, 'Por favor, haz una pregunta para la encuesta', m)
  const pollMessage = {
    name: `Encuesta Realizada Por @${user("@")[0]}:\n\n *${text}*`,
    min: 1,
    max: 1
  }
  await conn.sendMessage(m.chat, pollMessage, 'poll', pollMessage)
}
handler.help = ['encuesta <pregunta>']
handler.tags = ['group']
handler.command = ['poll', 'encuesta', 'polling']
handler.group = true
export default handler