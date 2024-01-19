import fetch from 'node-fetch'

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const apiUrl = 'https://skizo.tech/api/game/tebakbendera?apikey=kasumabot';

    let time = global.db.data.users[m.sender].wait + 40000;
    let textos = `\t*ADIVINA LA BANDERA*\n\nPuedes jugar usando el comando:\n\n${usedPrefix + command} jugar`;

    if (args[0] && args[0].toLowerCase() === 'jugar') {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Envía la imagen de la bandera al usuario
            conn.sendFile(m.chat, data.img, 'bandera.jpg', textos, m);

            // Almacena la respuesta correcta en la base de datos del usuario
            global.db.data.users[m.sender].answer = data.name.toLowerCase();
        } catch (error) {
            console.error(error);
            conn.reply(m.chat, 'Hubo un error al obtener la bandera. Inténtalo de nuevo más tarde.', m);
        }
    } else {
        conn.sendMessage(m.chat, { text: textos, mentions: [m.sender] }, { quoted: m });
    }

    global.db.data.users[m.sender].wait = new Date() * 1;
};


handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i

export default handler
