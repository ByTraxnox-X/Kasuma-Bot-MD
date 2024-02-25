let handler = async (m, { conn, text }) => {
    const q = m.quoted || m

    let mime = (q.msg || q).mimetype || ''

    if (!m.quoted || !/image/.test(mime))
        throw `Menciona una foto para convertir a documento PNG.`

    if (!text) throw `Ingrese el nombre que desea colocar al documento`

    let media = await q.download?.()

    if (!media) throw 'Error al descargar medio'

    m.reply(`Convirtiendo a PNG, espera un momento...`)

    return conn.sendMessage(m.chat, { document: media, mimetype: 'image/png', fileName: `${text}.png` }, { quoted: m })
}

handler.help = ['png <nombre>']
handler.tags = ['tools']
handler.command = ['png']

export default handler
