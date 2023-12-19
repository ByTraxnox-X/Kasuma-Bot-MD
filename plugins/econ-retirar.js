import db from '../lib/database.js';

let handler = async (m, { args }) => {
   
   let user =  global.db.data.users[m.sender]; if (!args[0]) return m.reply('ingresa la cantidad a retirar');
   if (args[0] == '--all') {
      let count = parseInt(user.bank);
      user.bank -= count * 1
      user.dolares += count * 1
      await m.reply(`Retiraste $${count} Dolares del Banco.`);
      return !0
   }
   if (!Number(args[0])) return m.reply('La cantidad debe ser un mumero.');
   let count = parseInt(args[0]);
   if (!user.bank) return m.reply('No tienes dinero en Banco.')
   if (user.bank < count) return m.reply(`Solo tienes $${user.bank} Dolares en el Banco.`)
   user.bank -= count * 1
   user.dolares += count * 1

   m.react(rwait)

   await m.reply(`Retiraste $${count} Dolares del Banco.`)

   m.react('🏧') 

}

handler.help = ['retirar']
handler.tags = ['econ']
handler.command = ['withdraw', 'retirar'] 

export default handler
