import { spawn } from 'child_process';

const restartBot = async () => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js';
    process.send('reset')
};
const handler = async (m, { conn, isROwner, text }) => {
  if (conn.user.jid == conn.user.jid) {
    restartBot();
  } else {
    throw 'eh';
  }
};

handler.help = ['reiniciar'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];


export default handler;

setInterval(restartBot, 1800000);
