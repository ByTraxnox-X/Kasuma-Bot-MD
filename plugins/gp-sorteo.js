
import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
async function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) throw `Ejemplo de uso:\n.sorteo *texto*`
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let k = Math.floor(Math.random() * 70);
let x = `${pickRandom(['👇🏻','👇🏻','👇🏻','👇🏻','👇🏻', '👇🏻', '👇🏻', '👇🏻', '👇🏻', '👇🏻','👇🏻','👇🏻','👇🏻','👇🏻','👇🏻','👇🏻', '👇🏻','👇🏻'])}`
let l = Math.floor(Math.random() * x.length);

let top = `*${x} EL GANADOR DEL SORTEO: ${text} ${x}*
    
*ES: ${user(a)}*
`
let txt = '';
let count = 0;
for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
//m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j]})
}
handler.help = handler.command = ['sorteo']
handler.tags = ['group']
handler.group = true
handler.admin = true
handler.limit = 2
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}