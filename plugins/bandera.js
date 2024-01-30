import fs from 'fs'

let timeout = 30000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
    conn.apiUrl = conn.apiUrl ? conn.apiUrl : {}
    let id = m.chat
    if (id in conn.apiUrl) {
        conn.reply(m.chat, 'Todavia hay un juego sin terminar!', conn.apiUrl[id][0])
        throw false
    }
   // let apiUrl = JSON.parse(fs.readFileSync("./src/game/casos.json"))
    const apiUrl = 'https://api-kasu.onrender.com/api/game/bandera?apikey=79242cc3';
  /*  let json = apiUrl[Math.floor(Math.random() * apiUrl.length)]
    let _clue = json.name
    let clue = _clue.replace(/[A-Za-z]/g, '_')*/
    let caption = `
*Cual es esta bandera?*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${poin} Exp

Recuerda responder con el nombre completo
`.trim()
    conn.apiUrl[id] = [
      // await conn.reply(m.chat, caption, m),
       
    const name = await fetch(apiUrl);
    const data = await name.json();

    conn.sendFile(m.chat, data.img, 'bandera.jpg', caption, m);
       
        json, poin,
        setTimeout(async () => {
            if (conn.apiUrl[id]) await conn.reply(m.chat, `Se acabó el tiempo!, intenta resolver de nuevo.`, conn.apiUrl[id][0])
            delete conn.apiUrl[id]
        }, timeout)
    ]
}

handler.help = ['bandera']
handler.tags = ['game']
handler.command = /^(bandera)$/i

export default handler