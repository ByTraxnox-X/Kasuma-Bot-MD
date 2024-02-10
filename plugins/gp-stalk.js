import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'
import emojiFlags from 'emoji-flags'

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

let handler = async (m, { conn, text }) => {
  let num = m.quoted?.sender || m.mentionedJid?.[0] || text
  if (!num) throw 'Ingrese el número'
  num = num.replace(/\D/g, '') + '@s.whatsapp.net'
  let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png')
  let bio = await conn.fetchStatus(num).catch(_ => {})
  let name = await conn.getName(num)
  let business = await conn.getBusinessProfile(num)
  let format = PhoneNum(`+${num.split('@')[0]}`)
  let countryCode = format.getRegionCode('international')
  let flag = emojiFlags[countryCode].emoji
  let country = regionNames.of(countryCode)

  let wea = `
*País:* ${country} ${flag}
*Nombre:* ${name}
*Formato del Número:* ${format.getNumber('international')}
*URL:* wa.me/${num.split('@')[0]}
*Mención:* @${num.split('@')[0]}
*Biografia:* ${bio?.status || 'Sin informacion'}
*Fecha de Biografia:* ${bio?.setAt ? moment(bio.setAt).locale('id').format('LL') : 'No disponible'}`

  if (business) {
    wea += `
*BusinessId:* ${business.wid}
*Website:* ${business.website ? business.website : 'Sin informacion'}
*Email:* ${business.email ? business.email : 'Sin informacion'}
*Categoría:* ${business.category}
*Dirección:* ${business.address ? business.address : 'Sin informacion'}
*Horario:* ${business.business_hours.timezone ? business.business_hours.timezone : 'Sin informacion'}
*Descripción:* ${business.description ? business.description : 'Sin informacion'} : 'Cuenta Estándar de WhatsApp'`
  }

  img ? await conn.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
};

handler.help = ['stalk']
handler.tags = ['tools']
handler.command = /^stalk$/i

export default handler
