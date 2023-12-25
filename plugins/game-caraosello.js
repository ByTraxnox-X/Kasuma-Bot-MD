let handler = async (m, { conn, text, command, usedPrefix, args }) => {
   const pp = './src/caraosello.jpg';
   let time = global.db.data.users[m.sender].wait + 40000;
   let textos = `CARA O SELLO\n\nPuedes Usar El Comando Usando\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`;

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
       let dolares = global.db.data.users[m.sender].exp += 2;
       m.reply(`Ganaste ${name} Elegiste: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`);
   } else if (text == 'cara') {
       if (pvjuegocs == 'cara') {
           let who;
           if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
           else who = m.sender;
           let name = conn.getName(who);
           let dolares = global.db.data.users[m.sender].exp += 2;
           m.reply(`Ganaste ${name} Elegiste: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`);
       } else {
           let who;
           if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
           else who = m.sender;
           let name = conn.getName(who);
           let dolares = global.db.data.users[m.sender].exp -= 300;
           m.reply(`Perdiste ${name} Elegiste: ${text}\nResultado: ${pvjuegocs}\nPerdiste: ${[dolares].getRandom()} $`);
       }
   } else if (text == 'cruz') {
       if (pvjuegocs == 'cruz') {
           let who;
           if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
           else who = m.sender;
           let name = conn.getName(who);
           let dolares = global.db.data.users[m.sender].exp += 100;
           m.reply(`Ganaste ${name} Elegiste: ${text}\nResultado: ${pvjuegocs}\nPremio: ${[dolares].getRandom()} $`);
       } else {
           let who;
           if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
           else who = m.sender;
           let name = conn.getName(who);
           let dolares = global.db.data.users[m.sender].exp -= 300;
           m.reply(`Perdiste ${name} Elegiste: ${text}\nResultado: ${pvjuegocs}\nPerdiste: ${[dolares].getRandom()} $`);
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
