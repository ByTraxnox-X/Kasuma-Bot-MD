const handler = async (m, {conn, args}) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`);
};
handler.help = ['nuevadescripcion <text>'];
handler.tags = ['group'];
handler.command = /^setdesk|nuevadescripcion$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
