
let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    const pp = './src/caraosello.jpg';
    let usuario = global.db.data.users[m.sender];
  
    if (!args[0]) {
        return conn.sendMessage(m.chat, `Para comprar una mascota, debes usar el comando de la siguiente manera:\n${usedPrefix}comprarmascota <nombre de la mascota>`, 'conversation', { quoted: m });
    }

    if (!usuario.dolares || usuario.dolares < 100) {
        return conn.sendMessage(m.chat, 'No tienes suficientes dólares para comprar una mascota', 'conversation', { quoted: m });
    }

    let mascota = args[0].trim();
  
    if (!global.misc.mascotas[mascota]) {
        return conn.sendMessage(m.chat, 'La mascota especificada no está disponible para la compra', 'conversation', { quoted: m });
    }

    if (global.db.data.mascotas[m.sender]) {
        return conn.sendMessage(m.chat, 'Ya tienes una mascota, no puedes tener más de una', 'conversation', { quoted: m });
    }

    usuario.dolares -= 100;
    global.db.data.mascotas[m.sender] = {
        id: global.mongoId(),
        name: mascota,
        owned: true
    };

    conn.sendMessage(m.chat, { image: { url: pp }, caption: `¡Felicidades! Has comprado a ${mascota} como tu nueva mascota. Ahora puedes disfrutar de sus habilidades en los juegos` }, { quoted: m });
};

handler.help = ['comprarmascota'];
handler.tags = ['game'];
handler.command = ['comprarmascota', 'comprarm'];
handler.group = true;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;