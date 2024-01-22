const handler = async (m, { text, args }) => {
    if (!text) throw 'Elija piedra, papel o tijera';

    const gameModes = ['1vs1', '2vs2', '1vs2'];
    const mode = args[0]?.toLowerCase();

    if (!mode || !gameModes.includes(mode)) throw 'Seleccione un modo de juego válido: 1vs1, 2vs2, 1vs2';

    const o = ['piedra', 'papel', 'tijera'];
    const userChoice = text.toLowerCase();
    const botChoice = o[Math.floor(Math.random() * o.length)];

    if (!o.includes(userChoice)) throw 'Elija piedra, papel o tijera';

    let r, p;

    if (mode === '1vs1') {
        // Lógica para 1 vs 1
        r = userChoice === botChoice ? '*Empate*' : (userChoice === 'piedra' && botChoice === 'tijera') || (userChoice === 'tijera' && botChoice === 'papel') || (userChoice === 'papel' && botChoice === 'piedra') ? '*Ganaste*' : '*Perdiste*';
        p = r === '*Empate*' ? '(±)100 XP' : r === '*Ganaste*' ? '*+300 XP*' : '*-300 XP*';
    } else if (mode === '2vs2') {
        // Lógica para 2 vs 2
        const team1 = ['piedra', 'papel', 'tijera'];
        const team2 = ['piedra', 'papel', 'tijera'];

        const result1 = team1.includes(userChoice) ? userChoice : 'error';
        const result2 = team2[Math.floor(Math.random() * team2.length)];

        r = result1 === result2 ? '*Empate*' : (result1 === 'piedra' && result2 === 'tijera') || (result1 === 'tijera' && result2 === 'papel') || (result1 === 'papel' && result2 === 'piedra') ? '*Ganaron*' : '*Perdieron*';
        p = r === '*Empate*' ? '(±)100 XP para ambos equipos' : r === '*Ganaron*' ? '*+300 XP* para equipo 1*' : '*+300 XP* para equipo 2*';

    } else if (mode === '1vs2') {
        // Lógica para 1 vs 2
        const playerResult = userChoice;
        const teamResult = ['piedra', 'papel', 'tijera'][Math.floor(Math.random() * 3)];

        r = playerResult === teamResult ? '*Ganaste*' : '*Perdiste*';
        p = r === '*Ganaste*' ? '*+300 XP*' : '*-300 XP*';
    }

    global.db.data.users[m.sender].exp += r === '*Empate*' ? 100 : r === '*Ganaste*' ? 300 : -300;
    m.reply(`${r}\nTú: ${userChoice}\nKasuma: ${botChoice}\n\nPuntos ${p}`);
};

handler.help = ['ppt <piedra/papel/tijera> [modo: 1vs1, 2vs2, 1vs2]'];
handler.tags = ['game'];
handler.command = ['ppt'];
handler.register = false;
export default handler;
