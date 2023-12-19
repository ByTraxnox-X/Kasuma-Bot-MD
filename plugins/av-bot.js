
let handler = async (m, { conn}) => {

let name = conn.getName(m.sender)


m.reply(`Hola *${name}*\nNecesitas ayuda?\nusa *!menu* para conocer mis funciones!

Si quieres un poco de informacion sobre mi visita el siguiente canal ${canal}`)

m.react('📢') 

} 

handler.customPrefix = /^(bot|wabot)$/i
handler.command = new RegExp

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
