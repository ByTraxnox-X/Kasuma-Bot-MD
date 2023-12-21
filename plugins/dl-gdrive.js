
import fg from 'api-dylux'  
let handler = async (m, { conn, args, usedPrefix, command }) => {

	if (!args[0]) throw `Ingrese un link de Google Drive`
	m.react(rwait) 
	try {
	let res = await fg.GDriveDl(args[0])
	 await m.reply(`*${res.fileName}*
	 
*Tamaño:* ${res.fileSize}
*tipo:* ${res.mimetype}`)

    m.react(done)	
	conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
	m.react(done)
   } catch {
	m.reply('Error: Revisa el link o intenta con otro link') 
  }
}
handler.help = ['gdrive']
handler.tags = ['dl']
handler.command = ['gdrive']

export default handler
