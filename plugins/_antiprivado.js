export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA')) return !0;
  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`*Hola @${m.sender.split`@`[0]}*, hablar con el bot en el privado es ilegal, serás bloqueado. Únete a nuestra comunidad: ${wagp}`, false, { mentions: [m.sender] });

    // Guardar información del grupo si es un grupo
    if (m.isGroup) {
      global.db.data.blockedUsers = global.db.data.blockedUsers || {};
      global.db.data.blockedUsers[m.sender] = global.db.data.blockedUsers[m.sender] || [];
      if (!global.db.data.blockedUsers[m.sender].includes(m.chat)) {
        global.db.data.blockedUsers[m.sender].push(m.chat);
      }
    }

    await conn.updateBlockStatus(m.chat, 'block');
  } else if (chat.antiPrivate) {
    return !1;
  }

  return !1;
}
