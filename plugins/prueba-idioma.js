const handler = async (m, {text, command, lenguaje, args, usedPrefix}) => {

let user = global.db.data.users[m.sender]

if (!text) return m.reply(lenguaje.AvisoMG() + lenguaje.idioma(prefix)) 
if (budy.includes(`1`)) { 
idioma = 'es' 
idiomas = 'espanol'
}
if (budy.includes(`2`)) {
idioma = 'en'
idiomas = 'ingles'
}
user.Language = idioma
m.reply(lenguaje.idioma2() + idiomas)}



handler.command = /^(lenguaje)$/i
export default handler