let handler = async (m, { conn, args }) => {
    const pp = './src/Dado.jpg';
    let amount = parseInt(args[0]);
    let prediction = args[1]?.toLowerCase();

    if (args.length < 2 || !prediction) throw `Error, ingrese el monto y predicción (par/impar).`;

    let user = global.db.data.users[m.sender];

    if (isNaN(amount) || amount < 1) throw `Lo mínimo para apostar son 1 dolares.`;
    if (user.dolares < amount) throw '¡No tienes suficiente dinero!';

    let diceResult = Math.floor(Math.random() * 6) + 1;

    let result = '';
    let isPredictionCorrect;

    if (diceResult % 2 === 0) {
        result = `El dado ha caído en un número par (${diceResult}).`;
        isPredictionCorrect = prediction === 'par';
    } else {
        result = `El dado ha caído en un número impar (${diceResult}).`;
        isPredictionCorrect = prediction === 'impar';
    }

    if (isPredictionCorrect) {
        result += `\n\n¡Ganaste ${amount * 2} Dolares!`;
        user.dolares += amount * 2;
    } else {
        result += `\n\nPerdiste ${amount} Dolares.`;
        user.dolares -= amount;
    }

    await conn.sendMessage(pp, result);
    conn.sendMessage(m.chat, { image: { url: pp }, caption: result }, { quoted: m });
};

handler.help = ['dados apuesta/(par/impar)'];
handler.tags = ['econ'];
handler.command = ['dados', 'dado'];
handler.group = true;

export default handler;