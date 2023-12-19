import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'
import emojiFlags from 'emoji-flags'
import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `El usuario no se encuentra en mi base de datos`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[who]
let { name, exp, diamond, registered, banned, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)


let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
let format = PhoneNum(`+${who.split('@')[0]}`);
let countryCode = format.getRegionCode('international')
let flag = emojiFlags[countryCode].emoji
let countryName = regionNames.of(countryCode)


let currentTime = Date.now();
let registrationTime = regTime; 
let timeDifferenceInMilliseconds = currentTime - registrationTime;
let years = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
let remainingMilliseconds = timeDifferenceInMilliseconds % (1000 * 60 * 60 * 24 * 365);
let days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
remainingMilliseconds %= (1000 * 60 * 60 * 24);
let hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
remainingMilliseconds %= (1000 * 60 * 60);
let minutes = Math.floor(remainingMilliseconds / (1000 * 60));
remainingMilliseconds %= (1000 * 60);
let seconds = Math.floor(remainingMilliseconds / 1000);


let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')

let str = `
*PERFIL* 
*Nombres:* 
${username} ${registered ? '\n   • ' + name + ' ': ''}
@${who.replace(/@.+/, '')}
*Pais:* ${countryName} ${flag}
*Numero:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*Link:* wa.me/${who.split`@`[0]}${registered ? '\n*Edad*: ' + age + ' años' : ''}
*Advertencias:* ${warn}/${maxwarn}
*Diamantes:* ${diamond}
*Dolares:* ${user.dolares}
*Nivel*: ${level}
*XP*: Total ${exp} (${user.exp - min} / ${xp})\n${math <= 0 ? `listo para *${usedPrefix}levelup*` : `_*${math}xp*_ Falta para subir de nivel`}
*Rango:* ${role}
*Baneado:* ${banned ? 'Si': 'No'}
*Premium*: ${prem ? 'Si' : 'No'}
*Registrado:* ${registered ? 'Si': 'No'}
*Tiempo registrado:* ${years > 0 ? `${years} año${years !== 1 ? 's' : ''} ` : ''}${days > 0 ? `${days} día${days !== 1 ? 's' : ''} ` : ''}${hours > 0 ? `${hours} hora${hours !== 1 ? 's' : ''} ` : ''}${minutes > 0 ? `${minutes} minuto${minutes !== 1 ? 's' : ''} ` : ''}${seconds > 0 ? `${seconds} segundo${seconds !== 1 ? 's' : ''}` : ''}

`
    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false, { mentions: [who] })
    m.react(done)

}
handler.help = ['perfil']
handler.tags = ['group']
handler.command = ['profile', 'perfil'] 

export default handler
