let handler = async (m, { conn, text, usedPrefix, command }) => {
    const q = m.quoted || m

    let mime = (q.msg || q).mimetype || ''

    if (!m.quoted)
        throw `Responda a el Video o Audio que desea convertir a documento.`

    if (!text) throw `Ingrese el nombre que desea colocar al documento`
    if (!/audio|video/.test(mime)) throw `Responda al video o audio que desea convertir a documento`

    let media = await q.download?.()

    if (!media) throw 'Error al descargar medio'

    m.reply(`${wait}`)

    if (/video/.test(mime)) {

        return conn.sendMessage(m.chat, { document: media, mimetype: 'video/mp4', fileName: `${text}.mp4` }, { quoted: m })
    } else if (/audio/.test(mime)) {
        return conn.sendMessage(m.chat, { document: media, mimetype: 'audio/mpeg', fileName: `${text}.mp3` }, { quoted: m })
    }
}

handler.help = ['convdocumento <audio/video>']
handler.tags = ['tools']
handler.command = ['convdocumento']

export default handler