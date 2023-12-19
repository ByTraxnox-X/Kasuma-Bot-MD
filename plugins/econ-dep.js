import db from '../lib/database.js';

let handler = async (m, { args }) => {
   let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
   
   let users =  global.db.data.users[m.sender];
   if (!args[0]) return m.reply('ingresa la cantidad que deseas depositar');
   if (args[0] == '--all') {
      let count = parseInt(users.dolares);
      users.dolares -= count * 1
      users.bank += count * 1
      await m.reply(`ingresaste $${count} Dolares al Banco.`);
      return !0;
   };
   if (!Number(args[0])) return m.reply('ingresa un numero');
   let count = parseInt(args[0]);
   if (!users.dolares) return m.reply('no tienes dinero');
   if (users.dolares < count) return m.reply(`solo tienes $${users.dolares} dolares en la Cartera.`);
   users.dolares -= count * 1;
   users.bank += count * 1;

   m.react(rwait)

   await m.reply(`ingresaste $${count} Dolares al Banco`);

   m.react('💰') 

};

handler.help = ['depositar'];
handler.tags = ['econ'];
handler.command = ['depositar', 'depositar', 'dep'];

export default handler

