import '@whiskeysockets/baileys';
const handler = async (m, {conn, args, text}) => {
  if (!text) return;
  try {
    const text = args.join` `;
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text);
    }
  } catch (e) {
    return;
  }
};
handler.help = ['nuevonombre <text>'];
handler.tags = ['group'];
handler.command = /^(nuevonombre)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
