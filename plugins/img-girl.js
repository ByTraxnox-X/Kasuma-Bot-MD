
let handler = async(m, { conn, usedPrefix, command }) => {
	let girl = await conn.getFile(global.API('fgmods', '/api/img/girl', { }, 'apikey'))
	let img = girl.data
   await conn.sendFile(m.chat, img, 'img.jpg', `Resultado`, m)
}
handler.help = ['mujer']
handler.tags = ['img']
handler.command = ['mujer', 'woman']
handler.diamond = true

export default handler
