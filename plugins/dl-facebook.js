
import fg from 'api-dylux' 
let handler = async (m, { conn, args, usedPrefix, command }) => {
 
 if (!args[0]) throw `Envíe el link de un video de Facebook`
    m.react(rwait)
   try {
    let result = await fg.fbdl(args[0]);
    let tex = `*${result.title}*
`;
    m.react(done)
    conn.sendFile(m.chat, result.videoUrl, 'fb.mp4', tex, m);
    m.react(done);
  } catch (error) {
 	m.reply('Error: Intente de nuevo con otro link')
 	} 
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
