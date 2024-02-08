let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  await conn.groupSettingUpdate(m.chat, 'not_announcement');
  m.reply('*Grupo abierto*');
};

handler.help = ['abrirgrupoen'];
handler.tags = ['group'];
handler.command = /^(abrirgrupoen)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;
