
import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
    let q = m.quoted ? m.quoted : m
   let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''

    let media = await q.download?.()
    if (!media) throw 'Error al descargar medios'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Error al convertir'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
    } catch (e) {
        m.reply(`Responda al video o nota de voz que desea convertir a mp3 con el comando :\n\n*${usedPrefix + command}*`)
   }
}
handler.help = ['convmp3']
handler.tags = ['tools']
handler.command = ['conmp3', 'mp3', 'toudio'] 

export default handler
