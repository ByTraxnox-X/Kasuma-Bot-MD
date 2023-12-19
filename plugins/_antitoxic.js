const toxicRegex = /puto|putas|putos|jotos|gays|maricones|vrgs|gay|marica|idiota|huevon|vtalv|sapo|sapa|verga|mlp|huérfano|gey|negra|negro|perro|perra|hpt|hdp|huerfano|mierda|comemierda|comamonda|hijueputa|hijo|mariconada|puta|rata|malparidos|pendejos|Estúpidos|imbecil|rctmre|mrd|verga|vrga|maricon/i;

export async function before(m, {isAdmin, isBotAdmin, isOwner}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) {
    return !1;
  }
  const user = global.db.data.users[m.sender];
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const isToxic = toxicRegex.exec(m.text);
  let Close = 'announcement'
  if (isToxic && chat.antiToxic && !isOwner && !isAdmin) {
    user.warn += 1;
    if (!(user.warn >= 5)) await m.reply('' + `${user.warn == 1 ? `Hola *@${m.sender.split`@`[0]}*` : `@${m.sender.split`@`[0]}`}, decir la palabra *"${isToxic}"* está prohibido en este grupo. *Advertencia:* ${user.warn}/5.` + '', false, {mentions: [m.sender]});
  }

  if (user.warn >= 5) {
    user.warn = 0;
    await m.reply(`Hola *@${m.sender.split`@`[0]}*, superaste las 5 advertencias por lo que cerrare este grupo para evitar peleas (se abrira automaticamente dentro de 5 minutos).`, false, {mentions: [m.sender]});
    user.banned = true;
    await conn.groupSettingUpdate(m.chat, Close);

    setTimeout(async () => {
      let isOpen = 'not_announcement';
      await conn.groupSettingUpdate(m.chat, isOpen);
      }, 300000); 
  }
  return !1;
}