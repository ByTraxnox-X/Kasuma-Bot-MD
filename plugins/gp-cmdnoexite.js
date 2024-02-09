let handler = async (m, { conn, isGroup, isCmd }) => {
  if (!isGroup && isCmd) {
    conn.sendMessage(m.chat, 'El comando aún no está disponible, ¡pruébalo en los próximos días! _^', 'text', { quoted: m });
  }
}

//handler.command = /^(.*)$/i
handler.group = true

export default handler
