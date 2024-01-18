import { sticker } from '../lib/sticker.js'
const handler = async (m, {
        conn,
        usedPrefix
}) => {

const timeout = 60000
const poin = 1000

        conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
      /*  try {
                const id = m.sender
                if (id in conn.tebakbendera) {
                        conn.reply(m.chat, 'Todavía hay problemas que aún no has terminado.', conn.tebakbendera[id].msg)
                        throw false
                }*/
                const anua = await axios.get(API('xzn', 'api/game/tebakbendera', {}, 'apikey'))
                const json = anua.data
                if (!json.img) throw "error"
                // if (!json.status) throw json
                const caption = ` *ADIVINA LA BANDERA*

🎋 Adivina la bandera del stickers.

*[ Te quedan ]* ${(timeout / 1000).toFixed(2)} segundo
*[ Ayuda ]* ${usedPrefix}hben por ayuda
*[ Presente ]* ${poin} MP

!!! Reply pesan ini untuk menjawab
`.trim()
                const c = await conn.sendFile(m.chat, await sticker(json.img, "", ""), "", "", m)
                conn.tebakbendera[id] = [
                        await conn.reply(m.chat, caption, c),
                        json,
                        poin,
                        setTimeout(() => {
                                if (conn.tebakbendera[id]) conn.reply(m.chat, `*Se acabo el tiempo*

🎋 *Perdiste*

Intentemoslo de nuevo🧢`, conn.tebakbendera[id].msg)
                                delete conn.tebakbendera[id]
                        }, timeout)
                ]
             /* } catch {
    throw 'Error';
        }*/
}
handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^adivinabandera/i

export default handler;