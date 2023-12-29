let handler = async (m, { conn, args, Replit, usedPrefix, command }) => {
   /* let yesno = {
        'ayudar': 'Gracias por ayudarme',
        'dejarla': 'Dejastes que se la llevaran',
    }[(args[0] || '')]
   if (yesno === undefined)*/

  if (args[0] == "ayudar"){
m.reply('Gracias por ayudarme')
}

if (args[0] == "dejarla"){
m.reply('Dejastes que se la llevaran')
}

        throw `
Hola, soy la princesa, *Ohhh noo*
ayuda me estan secuestrando

  *${usedPrefix + command} ayudar*
  *${usedPrefix + command} dejarla*
`.trim()
// await conn.sendMessage(m.chat, caption: yesno)


}

handler.help = ['rescatarprincesa'];
handler.tags = ['game'];
handler.command = /^rescatarprincesa$/i;

export default handler;