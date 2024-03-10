import { getDevice } from '@whiskeysockets/baileys'

let handler = async (m) => {
	m.reply(await getDevice(m.quoted ? m.quoted.id : m.key.id))
}

handler.help = ['dispositivo']
handler.tags = ['tools']
handler.command = /^(dispositivo)$/i

export default handler