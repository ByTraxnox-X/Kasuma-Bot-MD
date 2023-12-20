import fs from 'fs';
const handler = async (m, { conn }) => {
  m.reply('enviando config');
  const sesi = await fs.readFileSync('./config.js');
  return await conn.sendMessage(m.chat, {document: sesi, mimetype: 'application/json', fileName: 'config.json'}, {quoted: m});
};
handler.help = ['config'];
handler.tags = ['owner'];
handler.command = /^(config)$/i;
handler.owner = true

export default handler;
