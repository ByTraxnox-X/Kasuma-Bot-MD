
let handler = async(m, { conn, text, usedPrefix, command }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  const pp = './src/Dado.jpg'
      
  let love = `*Dados*
${name} Tu resultado es *${Math.floor(Math.random() * 6)}* 🎲`
  
  conn.sendMessage(m.chat,{image: {url: pp}, caption: love, mentions: [m.sender]}, {quoted: m}) 
  }
  
  handler.help = ['dado  @user']
  handler.tags = ['fun']
  handler.command = /^(dado)$/i
  export default handler
  