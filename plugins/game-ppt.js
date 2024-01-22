const activeChallenges = {};

const handler = async (m, { text, args }) => {
    if (!text) throw 'Selecciona un modo de juego: 1vs1, duelo';

    const modes = ['1vs1', 'duelo'];
    const mode = args[0]?.toLowerCase();

    if (!modes.includes(mode)) throw 'Modo de juego no válido. Selecciona 1vs1 o duelo';

    if (mode === 'duelo') {
        m.reply('Usa el comando `.ppt @usuario` para desafiar a otro jugador.');
        return;
    }

    const validChoices = ['piedra', 'papel', 'tijera'];
    const userChoice = text.toLowerCase();

    if (!validChoices.includes(userChoice)) throw 'Elije piedra, papel o tijera';

    const opponent = args[1]?.replace('@', '');
    if (!opponent) throw 'Menciona a otro usuario para jugar';

    m.reply(`@${opponent}, ${m.sender} te desafía a un juego 1vs1 de piedra, papel o tijera. ¿Aceptas? (responde con .acepto o .rechazo)`);
    activeChallenges[m.sender] = { user: m.sender, opponent, userChoice };
};

handler.acceptChallenge = async (m) => {
    const challenge = activeChallenges[m.sender];
    if (challenge) {
        const { user, opponent, userChoice } = challenge;

        m.reply(`¡Perfecto! Ambos jugadores, elijan piedra, papel o tijera.`);
        m.send(`@${opponent}, ${user} ha aceptado tu desafío. Ambos jugadores, elijan piedra, papel o tijera.`);

        // Puedes agregar más detalles según tus necesidades aquí.

        delete activeChallenges[m.sender];
    } else {
        throw 'No tienes un desafío pendiente.';
    }
};

handler.rejectChallenge = async (m) => {
    if (activeChallenges[m.sender]) {
        m.reply(`¡Oh, qué lástima! El desafío ha sido rechazado.`);
        delete activeChallenges[m.sender];
    } else {
        throw 'No tienes un desafío pendiente.';
    }
};

handler.playGame = async (m) => {
    if (activeChallenges[m.sender]) {
        const { user, opponent, userChoice } = activeChallenges[m.sender];

        const validChoices = ['piedra', 'papel', 'tijera'];
        const opponentChoice = m.text.toLowerCase();

        if (!validChoices.includes(opponentChoice)) throw 'Elije piedra, papel o tijera';

        // Lógica para determinar el resultado del juego
        const result = userChoice === opponentChoice ? '*Empate*' : (userChoice === 'piedra' && opponentChoice === 'tijera') || (userChoice === 'tijera' && opponentChoice === 'papel') || (userChoice === 'papel' && opponentChoice === 'piedra') ? `*@${user} ganó*` : `*@${opponent} ganó*`;

        m.reply(`${result}\n${user}: ${userChoice}\n${opponent}: ${opponentChoice}`);
        m.send(`${result}\n${user}: ${userChoice}\n${opponent}: ${opponentChoice}`);

        delete activeChallenges[m.sender];
    } else {
        throw 'No hay un juego en curso.';
    }
};

handler.help = [
    'ppt <piedra/papel/tijera>',
    '.ppt duelo - Iniciar un juego de duelo',
    '.ppt 1vs1 @usuario - Desafiar a otro usuario a un juego 1 vs 1',
    '.acepto - Aceptar un desafío pendiente',
    '.rechazo - Rechazar un desafío pendiente',
    '.jugar <piedra/papel/tijera> - Jugar una ronda del juego activo'
];
handler.tags = ['game'];
handler.command = ['ppt', 'acepto', 'rechazo', 'jugar'];
handler.register = true;
export default handler;
