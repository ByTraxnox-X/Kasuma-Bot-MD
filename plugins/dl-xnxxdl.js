
import fetch from 'node-fetch'
import fg from 'api-dylux'
let handler = async (m, { conn, args, text, usedPrefix, command }) => {

 let chat = global.db.data.chats[m.chat]
  if (!chat.nsfw) throw `El grupo no admite contenido nsfw \n\nPara habilitar escriba \n*${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 17) throw `Eres menor de edad! vuelve cuando tengas más de 18 años`
  if (!text) throw `Para buscar\nUse: *${usedPrefix + command} search*\n\nPara descargar desde URL:\nUse: *${usedPrefix + command} url*`
    
    m.react(rwait)
    if (text.includes('http://') || text.includes('https://')) {
        if (!text.includes(`${xnxx}`)) return m.reply(`Ingrese un link de *xnxx.com*`)
        try {
            let xn = await fg.xnxxdl(text)
            conn.sendFile(m.chat, xn.result.files.high, xn.result.title + '.mp4', `
      
*Título*: ${xn.result.title}
*Duración:* ${xn.result.duration}
*Calidad:* ${xn.result.quality}
`.trim(), m, false, { asDocument: chat.useDocument })
 m.react(done)
 } catch (e) {
    m.reply(`Error : intenta mas tarde`)
 }
    } else {
        try {
            let res = await fg.xnxxSearch(text)
            let ff = res.result.map((v, i) => `${i + 1}┃ *Titulo* : ${v.title}\n*Link:* ${v.link}\n`).join('\n') 
              if (res.status) m.reply(ff)
            } catch (e) {
              m.reply(`Error: intenta mas tarde`)
               }
    }
}
handler.help = ['xnxx'] 
handler.tags = ['dl']
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx'] 
handler.register = true

export default handler
