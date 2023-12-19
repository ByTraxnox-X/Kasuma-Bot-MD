
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (command == 'purgatorio') {
        const purgatorio = './src/mapas/purgatorio.jpeg';

        let mensaje1 = `*PURGATORIO MAPA*`;
    
        conn.sendMessage(m.chat, { image: { url: purgatorio }, caption: mensaje1 }, { quoted: m });
    }
        
    if (command == 'kalahari') {
        const kalahari = './src/mapas/kalahari.jpg';

        let mensaje2 = `*KALAHARI MAPA*`;

        conn.sendMessage(m.chat, { image: { url: kalahari }, caption: mensaje2 }, { quoted: m });
      
    }
  
    if (command == 'bermuda') {
        const bermuda = './src/mapas/bermuda.jpeg';

        let mensaje3 = `*BERMUDA MAPA*`;
    
        conn.sendMessage(m.chat, { image: { url: bermuda }, caption: mensaje3 }, { quoted: m });
      
    }
  
    if (command == 'alpes') {
        const alpes = './src/mapas/alpes.jpeg';

        let mensaje4 = `*ALPES MAPA*`;
    
        conn.sendMessage(m.chat, { image: { url: alpes }, caption: mensaje4 }, { quoted: m });
      
    }
  
  }
      
  handler.help = handler.command = ['purgatorio', 'kalahari', 'bermuda', 'alpes']
  handler.tags = ['free']
  export default handler
  