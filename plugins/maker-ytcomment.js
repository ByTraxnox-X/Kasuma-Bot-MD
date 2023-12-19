const handler = async (m, {conn, text}) => {
  if (!text) throw `ingrese el texto`
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/youtube-comment', {
    avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    comment: text,
    username: conn.getName(m.sender),
  }), 'error.png', 'Comentaste en youtube azul?', m);
};
handler.help = ['ytcomment <comment>'];
handler.tags = ['img'];
handler.command = /^(ytcomment)$/i;
export default handler;
