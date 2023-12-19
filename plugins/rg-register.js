
import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `Ya estás registrado\n\n¿Quiere volver a registrarse?\n\nUse este comando para eliminar su registro \n*${usedPrefix}unreg* <Número de serie>`
  if (!Reg.test(text)) throw `Formato incorrecto\n\n Uso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command}* ${name2}.14`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'El nombre no puede estar vacío'
  if (!age) throw 'La edad no puede estar vacía'
  if (name.length >= 30) throw 'El nombre es demasiado largo' 
  age = parseInt(age)
  if (age > 100) throw 'Wow el abuelo quiere jugar al bot'
  if (age < 5) throw 'hay un abuelo bebé jsjsj '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
*REGISTRADO*
*Nombre:* ${name}
*Edad* : ${age} años
*Numero de serie*:
${sn}


 *${usedPrefix}help* para ver el Menu
`.trim())
}
handler.help = ['registrarme'].map(v => v + ' <nombre.edad>')
handler.tags = ['rg']
handler.command = ['verify', 'reg', 'register', 'registrarme'] 

export default handler

