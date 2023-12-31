
import { canLevelUp, xpRange } from '../lib/levelling.js'
let handler = async (m, { conn }) => {
	  let name = conn.getName(m.sender)
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/nHHUm1a.png')
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `
 *NIVEL*
Nombre: *${name}*
Nivel: *${user.level}*
XP: *${user.exp - min}/${xp}*
Rango: *${user.role}*


Te falta *${max - user.exp}* de *XP* para subir de nivel
`.trim()
try {
  let imgg = API(`${visionary2}`, '/api/maker/canvas/levelup', {
    profile: pp,
    username: name,
    level: user.level,
    xp: user.exp - min,
})

    conn.sendFile(m.chat, imgg, 'level.jpg', txt, m)
} catch (e) {
    m.reply(txt)
}
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
    	user.role = global.rpg.role(user.level).name

        let str = `
*LEVEL UP*
Nivel anterior: *${before}*
 Nivel actual: *${user.level}*
Rango: *${user.role}*


Cuanto más interactúes con los bots, mayor será tu nivel`.trim()
        try {
            let img = API(`${visionary2}`, '/api/maker/canvas/levelup', { 
                profile: pp,
                username: name,
                level: user.level,
                xp: user.exp - min,
             })
      conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['nivel']
handler.tags = ['econ']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

export default handler