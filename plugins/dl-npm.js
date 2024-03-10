import fetch from 'node-fetch'

let handler = async (m, { text }) => {
	if (!text) throw 'Ingrese el nombre del modulo a buscar'
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) throw `Modulo no disponible.`
	let txt = objects.map(({ package: pkg }) => {
		return `*Nombre:* ${pkg.name}\n*Version:* ${pkg.version}\n*Link:* ${pkg.links.npm}\n*Descripcion:* ${pkg.description}`
	}).join`\n\n`
	m.reply(txt)
}
handler.help = ['npmsearch']
handler.tags = ['tools']
handler.command = /^npm(js|search)?$/i

export default handler