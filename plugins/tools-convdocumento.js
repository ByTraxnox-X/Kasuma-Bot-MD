let handler = async (m, { conn, text, usedPrefix, command }) => {
    const q = m.quoted || m

    let mime = (q.msg || q).mimetype || ''

    if (!m.quoted)
        throw `Menciona una foto para convertir a documento PNG.`

    if (!text) throw `Ingrese el nombre que desea colocar al documento`
    if (!/audio|video|image/.test(mime)) throw `Responda a la foto, video o audio que desea convertir a documento`

    let media = await q.download?.()

    if (!media) throw 'Error al descargar medio'

    m.reply(`Convirtiendo, espera un momento...`)

    if (/video/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'video/mp4', fileName: `${text}.mp4` }, { quoted: m })
    } else if (/audio/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'audio/mpeg', fileName: `${text}.mp3` }, { quoted: m })
    } else if (/image/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'image/png', fileName: `${text}.png` }, { quoted: m })
    }
}

handler.help = ['convdocumento <audio/video/image>']
handler.tags = ['tools']
handler.command = ['convdocumento']

export default handler
