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

   let ganancia = Math.floor(Math.random() * 201) - 100;

   if (ganancia < 0) {
       global.db.data.users[m.sender].dolares += ganancia;
       m.reply(`\tPerdiste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Perdiste:* ${ganancia} $`);
   } else {
       global.db.data.users[m.sender].dolares += ganancia;
       m.reply(`\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* ${ganancia} $`);
   }

   global.db.data.users[m.sender].wait = new Date() * 1;
};

handler.help = ['suerte'];
handler.tags = ['game'];
handler.command = ['suerte', 'gm'];
export default handler;
