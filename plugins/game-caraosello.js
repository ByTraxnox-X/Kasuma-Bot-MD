/*let handler = async (m, { conn, text, command, usedPrefix, args }) => {
   const pp = './src/caraosello.jpg';
   let time = global.db.data.users[m.sender].wait + 40000;
   let textos = `\t*CARA O SELLO*\n\nPuedes Jugar usando los comandos:\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`;

   if (args[0] && ['cara', 'cruz'].includes(args[0].toLowerCase())) {
       text = args[0].toLowerCase();
   } else {
       conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, mentions: [m.sender] }, { quoted: m });
       return; 
   }

   var pvjuegocs = Math.random() < 0.50 ? 'cara' : 'cruz';

   if (text == pvjuegocs) {
       // Si el usuario acierta
       let ganancia = Math.floor(Math.random() * 101);
       global.db.data.users[m.sender].dolares += ganancia;
       const pp = './src/caraosello.jpg';
      let msg = `\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* + ${ganancia} $`
      conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
   } else {
       // Si el usuario no acierta
       let perdida = Math.floor(Math.random() * 101);
       global.db.data.users[m.sender].dolares -= perdida;
       const pp = './src/caraosello.jpg';
       let msg = `\tPerdiste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Perdiste:* - ${perdida} $`
       conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
   }

   global.db.data.users[m.sender].wait = new Date() * 1;
};

handler.help = ['suerte'];
handler.tags = ['game'];
handler.command = ['suerte', 'gm'];
export default handler;*/