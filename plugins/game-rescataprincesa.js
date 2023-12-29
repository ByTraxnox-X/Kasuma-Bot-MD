let handler = async (m, { conn, args, usedPrefix, command }) => {




}

  if (args[0] == "ayudar"){
m.reply('Gracias por ayudarme')
}

if (args[0] == "dejarla"){
m.reply('Dejastes que se la llevaran')
}

        

handler.help = ['princesa'];
handler.tags = ['game'];
handler.command = /^rescatarprincesa$/i;

export default handler;