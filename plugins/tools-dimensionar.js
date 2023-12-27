import jimp from "jimp"
import uploadImage from "../lib/uploadImage.js"
import uploadFile from "../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix, args }) => {
       let towidth = args[0]
       let toheight = args[1]
       if (!towidth) throw 'Ingrese los pixeles de ancho'
       if (!toheight) throw 'Ingrese los pixeles de largo'

       let q = m.quoted ? m.quoted : m
       let mime = (q.msg || q).mimetype || ''
       if (!mime) throw `Mencione a una imagen y use el comando similar a este\n*Ejemplo:* ${usedPrefix + command} 400 400`

       let media = await q.download()
       let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
       if (!isMedia) throw `Archivo no compatible`
       let link = await (isMedia ? uploadImage : uploadImage)(media)

       let source = await jimp.read(await link)
       let size = {
              before: {
                     height: await source.getHeight(),
                     width: await source.getWidth()
              },
              after: {
                     height: toheight,
                     width: towidth,
              },
       }
       let compres = await conn.SendMessage(link, towidth - 0, toheight - 0)
       let linkcompres = await (isMedia ? uploadImage : uploadImage)(compres)

       conn.sendFile(m.chat, compres, null, `*Resolucion anterior:*\n
*Ancho:* ${size.before.width}
Altura:* ${size.before.height}

*Resolucion actual:*
Ancho: ${size.after.width}
Altura: ${size.after.height}

*Descarguela aqui*
*Original:* ${link}
*Comprimido:* ${linkcompres}`, m)
}
handler.help = ['resolucioncambiar <ancho><altura>']
handler.tags = ['tools']
handler.command = ["resolucioncambiar", "cambiarresolucion", "resize"]

export default handler
