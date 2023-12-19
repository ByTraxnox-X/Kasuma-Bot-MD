
let handler = async(m, { conn, text, usedPrefix, command }) => {

    const pp = './src/Ship.jpg'
        
    let love = `\t\t*MEDIDOR DE AMOR*
    
    El amor de ${text} por ti es de ${Math.floor(Math.random() * 100)}% de un 100%
    Deberias pedirle que sea tu  novia/o ?`
    
    conn.sendMessage(m.chat, {image: {url: pp}, caption: love, mentions: conn.parseMention(love)}, {quoted: m})
    }
    
    handler.help = ['ship  @user']
    handler.tags = ['fun']
    handler.command = /^ship$/i
    export default handler
    