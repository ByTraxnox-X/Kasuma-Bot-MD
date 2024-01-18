let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    const pp = './src/caraosello.jpg';
    const waitTime = 40000;
    const userWaitTime = global.db.data.users[m.sender].wait + waitTime;
    const texts = `\t*CARA O SELLO*\n\nPuedes jugar usando los comandos:\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz\n${usedPrefix + command} saldo\n${usedPrefix + command} retar @usuario`;

    if (args[0] && ['cara', 'cruz'].includes(args[0].toLowerCase())) {
        playCaraOSello(m, args[0].toLowerCase());
    } else if (args[0] && args[0].toLowerCase() === 'saldo') {
        checkSaldo(m);
    } else if (args[0] && args[0].toLowerCase() === 'retar' && m.mentionedJid) {
        retarJugador(m, m.mentionedJid[0]);
    } else {
        conn.sendMessage(m.chat, { image: { url: pp }, caption: texts, mentions: [m.sender] }, { quoted: m });
    }
};

const playCaraOSello = (m, userChoice) => {
    const pp = './src/caraosello.jpg';
    const result = Math.random() < 0.50 ? 'cara' : 'cruz';

    if (userChoice === result) {
        // Si el usuario acierta
        const ganancia = Math.floor(Math.random() * 101);
        global.db.data.users[m.sender].dolares += ganancia;
        const msg = `\tGanaste\n*Elegiste:* ${userChoice}\n*Resultado:* ${result}\n*Premio:* + ${ganancia} $`;
        conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
    } else {
        // Si el usuario no acierta
        const perdida = Math.floor(Math.random() * 101);
        global.db.data.users[m.sender].dolares -= perdida;
        const msg = `\tPerdiste\n*Elegiste:* ${userChoice}\n*Resultado:* ${result}\n*Perdiste:* - ${perdida} $`;
        conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
    }

    global.db.data.users[m.sender].wait = new Date() * 1;
};

const checkSaldo = (m) => {
    const saldoActual = global.db.data.users[m.sender].dolares;
    const msg = `\t*Saldo Actual:*\n${saldoActual} $`;
    conn.sendMessage(m.chat, msg, { quoted: m });
};

const retarJugador = (m, jugadorId) => {
    if (jugadorId === m.sender) {
        conn.sendMessage(m.chat, '¡No puedes retarte a ti mismo!', { quoted: m });
        return;
    }

    const pp = './src/caraosello.jpg';
    conn.sendMessage(jugadorId, `\t${m.sender.split('@')[0]} te ha retado a jugar CARA O SELLO. ¿Aceptas? Responde con ${usedPrefix + 'aceptar'} o ${usedPrefix + 'rechazar'}.`, { quoted: m });
    conn.sendMessage(m.chat, `Has retado a ${jugadorId.split('@')[0]} a jugar CARA O SELLO. Esperando respuesta...`, { image: { url: pp }, quoted: m });
};

handler.help = ['suerte'];
handler.tags = ['game'];
handler.command = ['suerte', 'gm'];
export default handler;
