let handler = async (m, { conn, isGroup, isCmd }) => {
  if (!isGroup && isCmd) {
    conn.sendMessage(m.chat, 'El comando aún no está disponible, ¡pruébalo en los próximos días!', 'text', { quoted: m });
  }
}

export default handler
