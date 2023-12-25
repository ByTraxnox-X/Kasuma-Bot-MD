let handler = async (m, { conn, text, command, usedPrefix, args }) => {
   const pp = './src/caraosello.jpg';
   let time = global.db.data.users[m.sender].wait + 40000;
   let textos = `\t*CARA O SELLO*\n\nPuedes Jugar usando los comandos:\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`;

   if (args[0] && ['cara', 'cruz'].includes(args[0].toLowerCase())) {
      text = args[0].toLowerCase();
   } else {
      conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, mentions: [m.sender] }, { quoted: m });
      return;
   }

   var pvjuegocs = Math.random();
   if (pvjuegocs < 0.50) {
      pvjuegocs = 'cara';
   } else {
      pvjuegocs = 'cruz';
   }

   if (text == pvjuegocs) {
      let who;
      if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
      else who = m.sender;
      let name = conn.getName(who);
      let dolares = global.db.data.users[m.sender].dolares += Math.floor(Math.random() * 101); // Premio entre 0 y 100 dólares
      m.reply(`\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* ${[dolares].getRandom()} $`);
   } else if (text == 'cara') {
      if (pvjuegocs == 'cara') {
         let who;
         if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
         else who = m.sender;
         let name = conn.getName(who);
         let dolares = global.db.data.users[m.sender].dolares += Math.floor(Math.random() * 101);
         m.reply(`\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* ${[dolares].getRandom()} $`);
      } else {
         let who;
         if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
         else who = m.sender;
         let name = conn.getName(who);
         let dolares = global.db.data.users[m.sender].dolares -= 300;
         m.reply(`\tPerdiste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Perdiste:* ${[dolares].getRandom()} $`);
      }
   } else if (text == 'cruz') {
      if (pvjuegocs == 'cruz') {
         let who;
         if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
         else who = m.sender;
         let name = conn.getName(who);
         let dolares = global.db.data.users[m.sender].dolares += Math.floor(Math.random() * 101);
         m.reply(`\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* ${[dolares].getRandom()} $`);
      } else {
         let who;
         if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
         else who = m.sender;
         let name = conn.getName(who);
         let dolares = global.db.data.users[m.sender].dolares -= 300;
         m.reply(`\tPerdiste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Perdiste:* ${[dolares].getRandom()} $`);
      }
   }

   global.db.data.users[m.sender].wait = new Date() * 1;
};

handler.help = ['suerte'];
handler.tags = ['game'];
handler.command = ['suerte', 'gm'];
export default handler;

function pickRandom(list) {
   return list[Math.floor(Math.random() * list.length)];
}
