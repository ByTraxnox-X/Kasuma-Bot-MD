
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	
if (!args[0]) throw `Falta texto para encuesta \n\nEjemplo: \n*${usedPrefix + command}* Mensaje  |como|xd`
if (!text.includes('|')) throw  `Separe las encuestas con *|* \n\nEjemplo: \n*${usedPrefix + command}* mi encuesta|n  |como|xd|vale`

let name = await conn.getName(m.sender)
let a = []
let b = text.split('|')
for (let c = 1 || 0; c < b.length; c++) {
a.push([b[c]])
			}
			return conn.sendPoll(m.chat, `*Encuesta solicitado por:* ${name}\n\n*Mensaje:* ${text.split('|')[0]}`, a, m)
}
handler.help = ['encuesta <hola|como|xd>']
handler.tags = ['group'] 
handler.command = ['poll', 'encuesta', 'polling'] 
handler.group = true

export default handler
