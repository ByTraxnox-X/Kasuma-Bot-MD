let handler = async (m, {
  conn,
  text,
  command,
  sender
}) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  text = text ? text.trim() : ''
  if (!text) return conn.reply(m.chat, 'Por favor, haz una pregunta para la encuesta', m)
let cap = "*Encuesta hecha por:* @${who.split('@')[0]}*\n*Mensaje:* ${text}"
  const pollMessage = {
    name: cap,
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