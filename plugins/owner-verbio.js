let handler = async (m, { conn, text, command }) => {
  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await conn.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) throw `La biografia del usuario esta oculta`
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await conn.fetchStatus(who)
      m.reply(bio.status)
    } catch {
      throw `La biografia del usuario esta oculta`
    }
  }
}
handler.help = ['verbio']
handler.tags = ['owner']
handler.command = /^verbio$/i
handler.owner = true

export default handler
