
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
     if (!teks) throw `Que escribo? Ejemplo : *${usedPrefix + command}* Hola puercos`
      m.react(rwait)
      let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'apikey')
      conn.sendFile(m.chat, img, 'img.png', ` Es mejor de lo que escribes tú`, m)
      m.react(done)

  }
  handler.help = ['txt']
  handler.tags = ['tools']
  handler.command = ['txt']
  
  export default handler
  
