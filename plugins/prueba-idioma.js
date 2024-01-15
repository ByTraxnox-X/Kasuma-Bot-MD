const handler = async (m, {text, command, lenguajeKA, args, usedPrefix}) => {
m.reply('use es o en')
//let language = 'es'
m.reply(`${lenguajeKA['p1']()}`)
//let languagen = 'en'
//m.reply(`${lenguajen['p1']()}`)
}
handler.command = /^(lenguaje)$/i
export default handler