let handler = async (m, { text }) => {
  if (!text) {
    throw 'Por favor, escribe tu nombre para jugar';
  }

  const reversedName = text.split('').reverse().join('');

  await m.reply(`Tu nombre al revés: ${reversedName}`);
};

handler.command = ['nombrealreves'];
handler.help = ['nombrealreves'];
handler.tags = ['game'];
export default handler;
