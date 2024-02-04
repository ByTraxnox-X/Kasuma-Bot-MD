export async function before(m, { isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes("PIEDRA") || m.text.includes("PAPEL") || m.text.includes("TIJERA")) return !0;
  let bot = global.db.data.settings[this.user.jid] || {};

  if (bot.antiPrivate && !isOwner && !isROwner) {
    const userGroups = [...this.chats.values()].filter(chat => chat.jid.endsWith('g.us') && chat.isGroup && chat.has(m.sender));
    if (userGroups.length > 0) {
      const groupNames = await Promise.all(userGroups.map(group => this.getName(group.jid)));
      const groupNameString = groupNames.join(', ');
      await m.reply(
        `» No está permitido enviar mensajes privados al bot. Serás bloqueado.\n\nEstás en los siguientes grupos: ${groupNameString}`,
        false,
        { mentions: [m.sender] }
      );

      // Guardar información en la base de datos solo si es un grupo
      global.db.data.blockedUsers = global.db.data.blockedUsers || {};
      global.db.data.blockedUsers[m.sender] = global.db.data.blockedUsers[m.sender] || [];
      global.db.data.blockedUsers[m.sender].push(...userGroups.map(group => group.jid));
      fs.writeFileSync('./lib/database.json', JSON.stringify(global.db.data, null, 2), 'utf-8'); // Guarda la base de datos de forma síncrona

      await this.updateBlockStatus(m.sender, "block");
    } else {
      await m.reply(
        `» No está permitido enviar mensajes privados al bot. Serás bloqueado.`,
        false,
        { mentions: [m.sender] }
      );
      await this.updateBlockStatus(m.sender, "block");
    }
  }
  return !1;
}

