let handler = async (m, { conn, groupMetadata, text, command}) => {
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;

    if (!user) {
      return conn.reply(m.chat, `No se encontró un usuario válido para ${command}`, m)
  }

  if (!text) {
      return conn.reply(m.chat, `Por favor, proporciona un texto para enviar a *@${user.split('@')[0]}*`, m)
  }

  if (!m.mentionedJid[0]) conn.reply(m.chat, `Le acabas de ${command} ${text} a *@${user.split('@')[0]}*`, null, { mentions: [user] })
  let participants = groupMetadata.participants
    conn.reply(m.chat, `Le acabas de ${command} ${text} 😳`, null, { mentions: [user] })
  
  }
  handler.help = ['regalar @tag', 'dar @tag', 'enviar @tag', 'meter @tag', 'chupar @tag', 'metersela @tag', 'calcular @tag', 'retar @tag']
  handler.tags = ['fun']
  handler.command = /^(regalar|dar|enviar|meter|chupar|metersela|calcular|retar)$/
  
  handler.group = true
  
  export default handler