
let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    const pp = './src/caraosello.jpg';
    let time = global.db.data.users[m.sender].wait + 40000;
    let usuario = global.db.data.users[m.sender];
    let rivalTag = args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : '';
    let rival = global.db.data.users[rivalTag];

    if (!rivalTag || m.sender === rivalTag || !rival) {
        return conn.sendMessage(m.chat, 'Debes etiquetar a un usuario válido para jugar contra él', 'conversation', { quoted: m });
    }

    if (usuario.dolares < 0) {
        return conn.sendMessage(m.chat, 'No tienes suficientes dólares para jugar', 'conversation', { quoted: m });
    }

    if (time > new Date() * 1) {
        let sisa = time - (new Date() * 1);
        throw `Debes esperar ${clockString(sisa)} para jugar de nuevo`;
    }

    let textos = `*CARA O SELLO*\n\n${m.sender.replace(/@.+/, '')} reta a un duelo a ${rivalTag.replace(/@.+/, '')}\n\nPuedes Jugar usando los comandos:\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`;

    if (args[0] && ['cara', 'cruz'].includes(args[0].toLowerCase())) {
        text = args[0].toLowerCase();
    } else {
        return conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, mentions: [m.sender, rivalTag] }, { quoted: m });
    }

    var pvjuegocs = Math.random() < 0.50 ? 'cara' : 'cruz';
    let ganancia = Math.floor(Math.random() * 101);
    let perdida = Math.floor(Math.random() * 101);
    
    if (text == pvjuegocs) {
        usuario.dolares += ganancia;
        rival.dolares -= ganancia;
        conn.sendMessage(m.chat, { image: { url: pp }, caption: `*${m.sender.replace(/@.+/, '')} ha ganado el duelo*\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* + ${ganancia} $ para ${m.sender.replace(/@.+/, '')} y - ${ganancia} $ para ${rivalTag.replace(/@.+/, '')}` }, { quoted: m });
    } else {
        usuario.dolares -= perdida;
        rival.dolares += perdida;
        conn.sendMessage(m.chat, { image: { url: pp }, caption: `*${rivalTag.replace(/@.+/, '')} ha ganado el duelo*\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* + ${ganancia} $ para ${rivalTag.replace(/@.+/, '')} y - ${ganancia} $ para ${m.sender.replace(/@.+/, '')}` }, { quoted: m });
    }

    usuario.wait = new Date() * 1 + 40000; // Actualizar tiempo de espera
};

handler.help = ['suerte2'];
handler.tags = ['game'];
handler.command = ['suerte2', 'gm2'];
handler.group = true;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 36e5);
    let m = isNaN(ms) ? '--' : Math.floor(ms % 36e5 / 6e4);
    let s = isNaN(ms) ? '--' : Math.floor(ms % 6e4 / 1000);
    return `${h}:${m}:${s}`;
}