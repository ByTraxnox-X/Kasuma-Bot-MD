let handler = async (m, { conn, args, usedPrefix, command }) => {
    let yesno = {
        'ayudar': 'Gracias por ayudarme',
        'dejarla': 'Dejastes que se la llevaran',
    }[(args[0] || '')]
    if (yesno === undefined)
        throw `
Hola, soy la princesa sebastian, *Ohhh noo*
ayuda me estan secuestrando

  *${usedPrefix + command} ayudar*
  *${usedPrefix + command} dejarla*
`.trim()
 await conn.sendMessage(m.chat, isClose)


}

handler.help = ['rescatarprincesa'];
handler.tags = ['game'];
handler.command = /^rescatarprincesa$/i;

export default handler;