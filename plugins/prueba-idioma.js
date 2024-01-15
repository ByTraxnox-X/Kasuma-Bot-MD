const handler = async (m, {text, command, args, usedPrefix}) => {
m.reply('use es o en')
let language = 'es'
m.reply(`${lenguaje['p1']()}`)
let language = 'en'
m.reply(`${lenguaje['p1']()}`)
}
handler.command = /^(lenguaje)$/i
export default handler