import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'

let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
	let num = m.quoted?.sender || m.mentionedJid?.[0] || text
	if (!num) throw `Ex: ${usedPrefix + cmd} @tag / 593xxxxxxx`
	num = num.replace(/\D/g, '') + '@s.whatsapp.net'
	if (!(await conn.onWhatsApp(num))[0]?.exists) throw 'Usuario inexistente'
	let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png')
	let bio = await conn.fetchStatus(num).catch(_ => { })
	let name = await conn.getName(num)
	let business = await conn.getBusinessProfile(num)
	let format = PhoneNum(`+${num.split('@')[0]}`)
	let country = regionNames.of(format.getRegionCode('international'))
	let wea = `\t*WHATSAPP*\n\n*continente:* ${country.toUpperCase()}\n*Nombre:* ${name ? name : '-'}\n*Formato del numero:* ${format.getNumber('international')}\n*Link:* wa.me/${num.split('@')[0]}\n*Mencion:* @${num.split('@')[0]}\n*Estado:* ${bio?.status || '-'}\n*Datos del estado:* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale('id').format('LL') : '-'}\n\n${business ? `\t*Informacion de empresa*\n\n*Id de la empresa:* ${business.wid}\n*Sitio web:* ${business.website ? business.website : '-'}\n*Email:* ${business.email ? business.email : '-'}\n*Categoria:* ${business.category}\n*Direccion:* ${business.address ? business.address : '-'}\n*Tiempo:* ${business.business_hours.timezone ? business.business_hours.timezone : '-'}\n*Descripcion*: ${business.description ? business.description : '-'}` : ''}`
	img ? await conn.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
}

handler.help = ['infowa']
handler.tags = ['tools']
handler.command = /^(infowa)$/i


export default handler