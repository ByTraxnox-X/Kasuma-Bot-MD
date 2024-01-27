const caraOSello = async (m, conn, command, usedPrefix) => {
    const pp = './src/caraosello.jpg';
    let time = global.db.data.users[m.sender].wait + 40000;
    let textos = `\t*CARA O SELLO*\n\nPuedes Jugar usando los comandos:\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz`;

    if (!text) {
        conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, mentions: [m.sender] }, { quoted: m });
        return;
    }

    if (args[0] && ['cara', 'cruz'].includes(args[0].toLowerCase())) {
        text = args[0].toLowerCase();
    } else {
        conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, mentions: [m.sender] }, { quoted: m });
        return; 
    }

    var pvjuegocs = Math.random() < 0.50 ? 'cara' : 'cruz';

    if (text == pvjuegocs) {
        // Si el usuario acierta
        let ganancia = Math.floor(Math.random() * 101);
        global.db.data.users[m.sender].dolares += ganancia;
        const pp = './src/caraosello.jpg';
        let msg = `\tGanaste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Premio:* + ${ganancia} $`
        conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
    } else {
        // Si el usuario no acierta
        let perdida = Math.floor(Math.random() * 101);
        global.db.data.users[m.sender].dolares -= perdida;
        const pp = './src/caraosello.jpg';
        let msg = `\tPerdiste\n*Elegiste:* ${text}\n*Resultado:* ${pvjuegocs}\n*Perdiste:* - ${perdida} $`
        conn.sendMessage(m.chat, { image: { url: pp }, caption: msg }, { quoted: m });
    }

    global.db.data.users[m.sender].wait = new Date() * 1;
};

const piedraPapelTijera = async (m, text) => {
    if (!text) throw 'Elija piedra, papel o tijera';
    const o = ['piedra', 'papel', 'tijera'];
    const a = o[Math.floor(Math.random() * o.length)];
    if (!o.includes(text.toLowerCase())) throw 'Elija piedra, papel o tijera';
    let r = text === a ? '*Empate*' : (text === 'piedra' && a === 'tijera') || (text === 'tijera' && a === 'papel') || (text === 'papel' && a === 'piedra') ? '*Ganaste*' : '*Perdiste*';
    let p = r === '*Empate*' ? '(±)100 XP' : r === '*Ganaste*' ? '*+300 XP*' : '*-300 XP*';
    global.db.data.users[m.sender].exp += r === '*Empate*' ? 100 : r === '*Ganaste*' ? 300 : -300;
    m.reply(`${r}\nTú: ${text}\nKasuma: ${a}\n\nPuntos ${p}`);
};

const pajeame = async (m, conn) => {
    let { key } = await conn.sendMessage(m.chat, { text: "Tas caliente! Ahora te hare una paja" }, { quoted: m });
    const array = [
        "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D", "8==👊=D", "8==👊==D", "8=👊===D", "8👊====D", "8=👊===D","8==👊==D", "8===👊=D", "8====👊D","8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D💦"
    ];

    for (let item of array) {
        await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 20)); // Delay 5 seconds
    }
    return conn.sendMessage(m.chat, { text: `Oh, se corrió en menos de 1 hora!`.trim() , edit: key, mentions: [m.sender] }, { quoted: m });
};

const handler = async (m, { conn, text, command, usedPrefix, args }) => {
    if (command === 'suerte' || command === 'gm') {
        await caraOSello(m, conn, command, usedPrefix);
    } else if (command === 'ppt') {
        await piedraPapelTijera(m, text);
    } else if (command === 'pajeame' || command === 'paja') {
        await pajeame(m, conn);
    }
};

handler.help = ['suerte', 'ppt <piedra/papel/tijera>', 'pajeame'];
handler.tags = ['game', 'fun'];
handler.command = ['suerte', 'gm', 'ppt', 'pajeame', 'paja'];
export default handler;
