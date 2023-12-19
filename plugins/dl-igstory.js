
import fg from 'api-dylux'
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Ingrese un nombre de usuario`
  m.react(rwait)
  let res = await fg.igstory(args[0])
  for (let { url, type } of res.results)
  m.react(rwait)
 {
    conn.sendFile(m.chat, url, 'igstory.bin', ``, m)
  }

  m.react(done)
}
handler.help = ['ighistoria']
handler.tags = ['dl']
handler.command = ['igstory', 'ighistoria'] 

export default handler
