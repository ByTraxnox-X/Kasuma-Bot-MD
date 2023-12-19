import fetch from 'node-fetch';

let handler = async (m, { conn, args, text }) => {
  if (!text) throw 'Por favor ingrese la url';

  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
  
  if (!shortUrl1) throw `Error, la api no ha generado un link.`;

  let done = `*URL ACORTADO:*\n${shortUrl1}`.trim();
  
  m.reply(done);
};

handler.help = ['acortarurl'].map(v => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^acortarurl$/i;

export default handler;
