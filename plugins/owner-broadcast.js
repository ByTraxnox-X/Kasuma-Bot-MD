//import Connection from '../lib/connection.js'
import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `Transmision realizada *Total:* ${chats.length} chats`, m)
  for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast|moni/i.test(teks) ? teks : `*TRANSMISIÓN STAFF*\n\n ${teks} ` ), true).catch(_ => _)
  m.reply('Se transmitió a todos los chats :)')
}
handler.help = ['comunicado']
handler.tags = ['owner']
handler.command = /^(comunicado|bc)$/i

handler.owner = true


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
