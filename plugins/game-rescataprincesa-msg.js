let handler = async (m, { conn, args, usedPrefix, command }) => {


throw `
Hola, soy la princesa, *Ohhh noo*
ayuda me estan secuestrando

  *${usedPrefix + 'princesa'} ayudar*
  *${usedPrefix + 'princesa'} dejarla*
`


}



handler.help = ['rescatarprincesa'];
handler.tags = ['game'];
handler.command = /^rescatarprincesa$/i;

export default handler;