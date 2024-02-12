import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Responde a la imagen que contiene el qr.'
let img = await q.download?.()
let url = await uploadImage(img)
let anu = await fetch(`${apikasu}/api/tools/readqr?img=${url}&apikey=${apikeykasu}`)
let json = await anu.json()
await m.reply(`${json.result}`)}
handler.command = /^(readqr)$/i
export default handler
