export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0
  if (m.isGroup) return !1
  if (!m.message) return !0
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA')) return !0

  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}

  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`*Hola @${m.sender.split`@`[0]}*, hablar con el bot en privado es ilegal. Serás bloqueado. Si deseas usar el bot, únete a nuestra comunidad: ${wagp}`, false, { mentions: [m.sender] });

    const blockedUserData = global.db.data.blockedUsers[m.sender] || { groups: [] };
    const groupName = m.chat && (await conn.getName(m.chat)) || m.chat;

    if (!blockedUserData.groups.some(group => group.jid === m.chat)) {
      blockedUserData.groups.push({ jid: m.chat, name: groupName });
      global.db.data.blockedUsers[m.sender] = blockedUserData;

      // Puedes ajustar la lógica de almacenamiento según tu sistema de base de datos
      // Por ejemplo, si estás utilizando MongoDB, podrías hacer algo como:
      // await mongoDB.collection('blockedUsers').updateOne({ _id: m.sender }, { $push: { groups: { $each: [{ jid: m.chat, name: groupName }] } } }, { upsert: true });

      // Ajusta la lógica de almacenamiento según tu sistema de base de datos
    }

    await conn.updateBlockStatus(m.chat, 'block');
  } else if (chat.antiPrivate) {
    return !1; // Evita bloquear al usuario si la función antiprivado del grupo está activada
  }

  return !1;
}
