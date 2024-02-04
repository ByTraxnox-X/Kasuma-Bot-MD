const comandos = /piedra|papel|tijera|estado|verificar|code|jadibot --code|--code|creador|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|register|registrar|reg|reg1|nombre|name|nombre2|name2|edad|age|edad2|age2|genero|género|gender|identidad|pasatiempo|hobby|identify|finalizar|pas2|pas3|pas4|pas5|registroc|deletesesion|registror|jadibot/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, usedPrefix, command }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  
  const regex = new RegExp(`^${comandos.source}$`, 'i');

  if (regex.test(m.text.toLowerCase().trim())) return !0;

  let chat, user, bot, mensaje;
  chat = global.db.data.chats[m.chat];
  user = global.db.data.users[m.sender];
  bot = global.db.data.settings[conn.user.jid] || {};

  if (bot.antiPrivate && !isOwner && !isROwner) {
    if (user.counterPrivate === 0) {
      mensaje = `*@${m.sender.split`@`[0]} ESTÁ PROHIBIDO ESCRIBIR AL PRIVADO*\n\n⚠️ \`\`\`PRIMERA ADVERTENCIA\`\`\` ⚠️`;
      await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });

    } else if (user.counterPrivate === 1) {
      let grupos = ['nn', 'nnn', 'nnnt', 'nnntt', 'nnnttt'].getRandom();
      mensaje = `*@${m.sender.split`@`[0]} YA SE MENCIONÓ QUE NO PUEDE ESCRIBIR AL PRIVADO. 🫤*\n\n⬇️ *PUEDE UNIRSE A ESTE GRUPO OFICIAL*\n${wagp}\n\n*SI VUELVE A ESCRIBIR SERÁ BLOQUEADO(A)*\n⚠️ \`\`\`SEGUNDA ADVERTENCIA\`\`\` ⚠️`;
      await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });

    } else if (user.counterPrivate === 2) {
      mensaje = `*@${m.sender.split`@`[0]} SERÁ BLOQUEADO(A). 👋 SE MENCIONÓ ANTES QUE NO PODÍA ESCRIBIR AL PRIVADO.*\n\n⚠️ \`\`\`TERCERA ADVERTENCIA\`\`\` ⚠️`;
      await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] });

      user.counterPrivate = -1;
      await conn.updateBlockStatus(m.chat, 'block');
    }
    user.counterPrivate++;
  } else if (chat.antiPrivate) return; //m.reply('')

  return !1;
}
