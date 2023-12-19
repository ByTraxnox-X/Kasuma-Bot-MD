
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    if (!args[0]) return m.reply(` Ingrese el prefijo de un país para buscar números en el grupo de ese pais, ejemplo: ${usedPrefix + command} 593`) 
    if (isNaN(args[0])) return m.reply(` Ingrese el prefijo de un país para buscar números en el grupo de ese pais, ejemplo: ${usedPrefix + command} 593`) 
    let lol = args[0].replace(/[+]/g, '')
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
    let bot = global.db.data.settings[conn.user.jid] || {}
    if (ps == '') return m.reply(` En este grupo no ahí ningún número con el área/prefijo +${lol}`)
    let numeros = ps.map(v=> '' + v.replace(/@.+/, ''))
    const delay = time => new Promise(res=>setTimeout(res,time));
    switch (command) {
    case "listanum": 
    conn.reply(m.chat, `LISTA DE NÚMEROS CON EL PREFIJO +${lol} QUE ESTAN EN EL GRUPO\n\n` + numeros.join`\n`, m, { mentions: ps })
    break   
    case "kicknum":  

    if (!isBotAdmin) return m.reply('necesito ser administrador para ejecutar el comando')          
    conn.reply(m.chat, `iniciando la eliminacion de numero con prefijo +${lol}, cada 10 minutos se eliminara un numero`, m)            
    let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
    for (let user of users) {
    let error = `@${user.split("@")[0]} ya ha sido eliminado`    
    if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
    await delay(2000)    
    let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)})  
    await delay(10000)
    } else return m.reply('error')}
    break            
    }}
    handler.help = ['listaprefijo (+)']
    handler.tags = ['group']
    handler.command = /^(listaprefijo|kicknum)$/i
    handler.group = handler.botAdmin = handler.admin = true
    handler.fail = null
    export default handler