import fs from 'fs'
import sagiri from 'sagiri'

let sauceClient = sagiri('96a418eb1f0d7581fad16d30e0dbf1dbbdf4d3bd')

let handler = async (m, { conn}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/image/.test(mime)) {
let media = Date.now() + '.' + mime.split('/')[1]
fs.writeFileSync(media, await q.download())
let sauce = await sauceClient(media)
let txt = sauce.map(({ url, site, similarity, thumbnail, authorName, authorUrl }) => {
return `
*Similiar:* ${similarity}%
*Sitio:* ${site}
*Enlace:* ${url}
*Banner:* ${thumbnail}
*Autor:* ${authorName}
*Enlace del autor:* ${authorUrl}`
}).join('')
await conn.sendFile(m.chat, sauce[0].thumbnail, 0, txt.trim(), m, false, {thumbnail: global.thumb2 })
fs.unlinkSync(media)
} else throw 'Responda a la imagen'
}

handler.help = ['buscarimg']
handler.tags = ['tools']
handler.command = /^buscarimg$/i

export default handler
