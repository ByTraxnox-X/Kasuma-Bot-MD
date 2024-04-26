console.log('Iniciando...')

import { join, dirname } from 'path'
import { createRequire } from 'module';
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'

/* 
!! QUERIDO PROGRAMADOR, CUANDO INICIE ESTE PROYECTO, LO HICE CON AYUDA DE UN AMIGO Y DIOSITO.
!! TODO SALIO MUY BIEN Y FUNCIONANDO, HOY EN DIA, MAS DE 1 AÑO DESPUES DE HABER SIDO CREADO, NI YO, NI MI AMIGO SABEMOS COMO FUNCIONA.
!! Y LE HEMOS PREGUNTADO A DIOS, Y EL TAMPOCO LO SABE, ASI QUE POR SU BIEN NO MODIFIQUE NADA, PORQUE NI CON LAS ESFERAS DEL DRAGON REVIVE ESTE CODIGO.

* HORAS PERDIDAS: 547
*/

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname) // Bring in the ability to create the 'require' method
const { name, author } = require(join(__dirname, './package.json')) // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say('Kasuma-Bot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})
say(`'${name}' By Traxnox, Sebastian`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

let isRunning = false
/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return
  isRunning = true
  const args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    console.log('[RECEIVED]', data)
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })
  
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('Ocurrió un error inesperado:', code)
    if (code === 0) return
    console.log('Reiniciando el servidor...')
    start(file)
})

  //----
  let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
  if (!opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
  // console.log(p)
}

start('main.js')
