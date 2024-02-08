
import fg from 'api-dylux' 
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `ingrese lo que quiere buscar \n\n*Ejemplo:*\n${usedPrefix + command} homero`
    try {
   let json = await fg.StickerSearch(text) 
    m.reply(`
Resultado

*Titulo:* ${json.title}
*Total stickers:* ${json.sticker_url.length}
*Tiempo estimado de envio:* _*${json.sticker_url.length * 2} s*_`)
    for (let i of json.sticker_url) {
        const stiker = await sticker(false, i, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    }
    } catch (e) {
	m.reply(`Error: prueba con otro`)
	} 
}
handler.help = ['buscarsticker']
handler.tags = ['sticker']
handler.command = ['buscarsticker', 'getstick', 'stickersearch', 'sticksearch'] 
handler.diamond = 3

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
