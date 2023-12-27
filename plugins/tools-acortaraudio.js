import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (!mime) throw 'Responda al audio o nota de voz'
	if (!text) throw 'Ingrese la nueva duracion en el audio'
	if (isNaN(text)) throw 'Error, ingrese solo numeros.'
	if (!/audio/.test(mime)) throw `Formato no compatible`
	let media = await q.download(true)
	let data = await uploadFile(media)

	conn.sendMessage(m.chat, { audio: { url: data.files[0].url }, seconds: `${text}`, ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m })
}

handler.help = ['acortaraudio *<segundos>*']
handler.tags = ['tools']
handler.command = /^(acortaraudio)$/i

export default handler

async function uploadFile(path) {
	let form = new FormData()
	form.append('files[]', fs.createReadStream(path))
	let res = await (await fetch(`https://uguu.se/upload.php`, {
		method: 'post',
		headers: {
			...form.getHeaders()
		},
		body: form
	})).json()
	await fs.promises.unlink(path)
	return res
}