let handler = async (m, { conn, isAdmin }) => {
    if (m.fromMe) throw 'Nggk'
    if (isAdmin) throw '*YA ES ADMIN DEL GRUPO MI Propietario(a)*'
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
  }
  handler.help = ['autoadmin']
  handler.tags = ['owner']
  handler.command = /^autoadmin$/i
  handler.rowner = true
  handler.botAdmin = true
  export default handler