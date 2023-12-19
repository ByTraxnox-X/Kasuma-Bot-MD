//import db from '../lib/database.js'

import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix }) {
  if (!args[0]) throw `*Ingrese número de serie*\nVerifique su número de serie con el comando\n\n*${usedPrefix}nserie*`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '*Número de serie incorrecto*'

  if (user.warn > 0) {
    throw 'No puedes ejecutar este comando, tienes advertencias pendientes.'
  }

  user.registered = false
  m.reply(`Registro eliminado`)
}
handler.help = ['borrarregistro <Num Serie>']
handler.tags = ['rg']

handler.command = ['unreg', 'borrarregistro']
handler.register = true

export default handler
