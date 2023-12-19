import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''

    let media = await q.download?.()
    if (!media) throw ' Error al descargar medios'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw ' Error al convertir'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
    } catch (e) {
        m.reply(` Responda el audio que desea convertir a nota de voz con :\n *${usedPrefix + command}*`)
   }
}
handler.help = ['convaudio']
handler.tags = ['tools']
handler.command = ['convaudio', 'tovn'] 

export default handler
