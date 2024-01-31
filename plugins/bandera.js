let axios = require('axios');

let handler = async (m, { conn }) => {
    try {
        let response = await axios.get('https://apikasu.onrender.com/juego/bandera/random');
        
        if (response.status === 200 && response.data && response.data.img) {
            let imgURL = response.data.img;
            conn.sendFile(m.chat, imgURL, 'bandera.jpg', '¿Cuál es el nombre de esta bandera?');
            
            // Espera la respuesta del usuario
            conn.waitForReply(m.chat, async (reply) => {
                if (reply.text.trim().toLowerCase() === response.data.respuesta.toLowerCase()) {
                    conn.reply(m.chat, `¡Correcto! La bandera es ${response.data.respuesta}.`, m);
                } else {
                    conn.reply(m.chat, `Incorrecto. La bandera es ${response.data.respuesta}.`, m);
                }
            });
        } else {
            conn.reply(m.chat, 'No se pudo obtener la imagen de la bandera. Inténtalo de nuevo más tarde.', m);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
        conn.reply(m.chat, 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.', m);
    }
}

handler.command = /^\bandera$/i
handler.tags = ['game']
handler.help = ['bandera']
module.exports = handler;
