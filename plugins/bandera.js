
import svg2img from 'svg2img'
import fs from 'fs'

let banderas = JSON.parse(fs.readFileSync('banderas.json'))

let handler = async (m, { conn, usedPrefix, args }) => {
  let paisAleatorio = banderas[Math.floor(Math.random() * banderas.length)]
  let svgUrl = paisAleatorio.foto // URL de la imagen en formato SVG

  svg2img(svgUrl, function(error, buffer) {
    if (error) {
      console.log('Error al convertir SVG a imagen:', error)
      return
    }
    fs.writeFileSync('bandera.jpg', buffer)

    conn.sendFile(m.chat, 'bandera.jpg', 'bandera.jpg', `¿Adivina a qué país pertenece esta bandera? Envía ${usedPrefix}bandera <país>`, m)

    m.reply('¿Cuál es el nombre de este país?')

    let respuesta = await conn.onMessage(m.chat, async (msg) => {
      if (msg.text && msg.text.toLowerCase() == paisAleatorio.pais.toLowerCase()) {
        conn.reply(m.chat, '¡Correcto! Has adivinado el país', msg)
      } else {
        conn.reply(m.chat, `Lo siento, la respuesta correcta es ${paisAleatorio.pais}`, msg)
      }
    })

    setTimeout(() => {
      if (!respuesta) {
        conn.reply(m.chat, 'El tiempo ha expirado. La respuesta correcta es ' + paisAleatorio.pais)
      }
    }, 40000)
  })
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler