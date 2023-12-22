import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`
*Aqui tienes nuestro repo!*

en el repositorio te explicamos como instalar nuestro Bot!, cualquier duda contacta a un moderador.

Repositorio: ${_package.homepage}
`.trim())
    
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'git', 'script'] 

export default handler