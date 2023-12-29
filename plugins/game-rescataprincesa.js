let handler = async (m, { conn, args, usedPrefix, command }) => {


throw `
Hola, soy la princesa, *Ohhh noo*
ayuda me estan secuestrando

  *${usedPrefix + command} ayudar*
  *${usedPrefix + command} dejarla*
`


}

  if (args[0] == "ayudar"){
m.reply('Gracias por ayudarme')
}

if (args[0] == "dejarla"){
m.reply('Dejastes que se la llevaran')
}

        

handler.help = ['rescatarprincesa'];
handler.tags = ['game'];
handler.command = /^rescatarprincesa$/i;

export default handler;