// Código corregido para la función "before"
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0
  if (m.isGroup) return !1
  if (!m.message) return !0
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA')) return !0

  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}

  if (bot.antiPrivate && !isOwner && !isROwner) {
    const userGroups = [...this.chats.values()].filter(chat => chat.jid.endsWith('g.us') && chat.isGroup && chat.has(m.sender));
    
    if (userGroups.length > 0) {
      const groupNames = await Promise.all(userGroups.map(group => conn.getName(group.jid)));
      const groupNameString = groupNames.join(', ');

      await m.reply(`*Hola @${m.sender.split`@`[0]}*, hablar con el bot en privado es ilegal. Serás bloqueado.\n\nEstás en los siguientes grupos: ${groupNameString}`, false, { mentions: [m.sender] });

      global.db.data.blockedUsers = global.db.data.blockedUsers || {};
      global.db.data.blockedUsers[m.sender] = global.db.data.blockedUsers[m.sender] || [];
      global.db.data.blockedUsers[m.sender].push({ groups: userGroups.map(group => ({ jid: group.jid, name: groupNameString })) });

      // Puedes ajustar la lógica de almacenamiento según tu sistema de base de datos
      // Por ejemplo, si estás utilizando MongoDB, podrías hacer algo como:
      // await mongoDB.collection('blockedUsers').updateOne({ _id: m.sender }, { $push: { groups: { $each: userGroups.map(group => ({ jid: group.jid, name: groupNameString })) } } }, { upsert: true });
      
      // Ajusta la lógica de almacenamiento según tu sistema de base de datos
    }

    await conn.updateBlockStatus(m.chat, 'block');
  } else if (chat.antiPrivate) {
    return !1; // Evita bloquear al usuario si la función antiprivado del grupo está activada
  }

  return !1;
}
