import { execSync } from 'child_process';

let handler = async (m, { conn, text }) => {
  try {
    if (global.conn.user.jid == conn.user.jid) {
      let stdout = execSync('git reset --hard && git pull --all' + (m.fromMe && text ? ' ' + text : ''));
      conn.reply(m.chat, stdout.toString(), m);
    }
  } catch {
    try {
      var update = execSync('git remote set-url origin https://github.com/ByTraxnox-X/KasumaBot-MD.git && git reset --hard && git pull --all');
      await m.reply(update.toString());
    } catch {
      await m.reply(`Lo siento, tuve un error al actualizar el bot, inténtalo nuevamente`);
    }
  }
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = /^update|actualizar$/i;
handler.rowner = true;

export default handler;
