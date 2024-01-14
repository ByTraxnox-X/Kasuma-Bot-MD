import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Ingrese un linj de mediafire.`
try {  
let res = await mediafireDl(args[0])
let { name, size, date, mime, link } = res
let caption = `*NOMBRE*
${name}

*PESO*
${size}

*TIPO*
┃ ${mime}`.trim()
conn.reply(m.chat, caption, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'KasumaBot-MD',
body: 'Super Bot De WhatsApp',         
previewType: 0, thumbnail: fs.readFileSync("./src/tx_logo.png"),
sourceUrl: `https://github.com/ByTraxnox-X/KasumaBot-MD`}}})
   await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })
} catch (e) {
m.reply(`Vuelva a intentar, debe ser un enlace de mediafire.`)
handler.limit = false      
}}
handler.help = ['mediafire2'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire2|mediafiredl2|dlmediafire2)$/i
//handler.register = true
handler.limit = true
export default handler

async function mediafireDl(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
const $ = cheerio.load(res.data)
const link = $('#downloadButton').attr('href')
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
let mime = ''
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name, size, date, mime, link }
}
