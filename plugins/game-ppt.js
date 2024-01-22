const activeGames = {};

const handler = async (m, { text, args, mentions }) => {
    if (!text) throw 'Elija piedra, papel o tijera';

    const gameModes = ['1vs1', 'duelo'];
    const mode = args[0]?.toLowerCase();

    if (!mode || !gameModes.includes(mode)) throw 'Seleccione un modo de juego válido: 1vs1, duelo';

    const userChoice = text.toLowerCase();

    if (!['piedra', 'papel', 'tijera'].includes(userChoice)) throw 'Elija piedra, papel o tijera';

    if (mode === '1vs1' || mode === 'duelo') {
        const opponent = mentions[0];
        if (!opponent) throw 'Menciona a otro usuario para jugar';

        m.reply(`@${opponent.id}, ${m.sender} quiere jugar a piedra, papel o tijera contigo. ¿Aceptas? (responde con .acepto o .rechazo)`);
        activeGames[m.sender] = { mode, userChoice, opponent: opponent.id };
        return;
    }

    // Resto del código para otros modos...
};

handler.acceptChallenge = async (m) => {
    if (activeGames[m.sender]) {
        const { mode, userChoice, opponent } = activeGames[m.sender];

        if (mode === '1vs1' || mode === 'duelo') {
            m.reply(`¡Perfecto! Ambos jugadores, elijan piedra, papel o tijera.`);
            m.send(`@${opponent.id}, ${m.sender} ha aceptado el desafío. Ambos jugadores, elijan piedra, papel o tijera.`);
            return;
        }

        // Resto del código para otros modos...
    } else {
        throw 'No tienes un desafío pendiente.';
    }
};

handler.rejectChallenge = async (m) => {
    if (activeGames[m.sender]) {
        m.reply(`¡Oh, qué lástima! El desafío ha sido rechazado.`);
        delete activeGames[m.sender];
    } else {
        throw 'No tienes un desafío pendiente.';
    }
};

handler.playGame = async (m) => {
    if (activeGames[m.sender]) {
        const { mode, userChoice, opponent } = activeGames[m.sender];

        if (mode === '1vs1' || mode === 'duelo') {
            const botChoice = ['piedra', 'papel', 'tijera'][Math.floor(Math.random() * 3)];

            // Lógica específica para el PvP
            const result = userChoice === botChoice ? '*Empate*' : (userChoice === 'piedra' && botChoice === 'tijera') || (userChoice === 'tijera' && botChoice === 'papel') || (userChoice === 'papel' && botChoice === 'piedra') ? `*@${m.sender} ganó*` : `*@${opponent.id} ganó*`;
            const xpChange = result === '*Empate*' ? '(±)100 XP para ambos' : result.includes('ganó') ? '*+300 XP*' : '*-300 XP*';

            m.reply(`${result}\n${m.sender}: ${userChoice}\n${opponent.id}: ${botChoice}\n\nPuntos ${xpChange}`);
            m.send(`${result}\n${m.sender}: ${userChoice}\n${opponent.id}: ${botChoice}\n\nPuntos ${xpChange}`);
        }

        // Resto del código para otros modos...

        delete activeGames[m.sender];
    } else {
        throw 'No hay un juego en curso.';
    }
};

handler.help = [
    'ppt <piedra/papel/tijera> [modo: 1vs1, duelo]',
    '.ppt @usuario 1vs1 - Iniciar un desafío de 1 vs 1 con otro usuario',
    '.ppt @usuario duelo - Retar a otro usuario a un duelo',
    '.acepto - Aceptar un desafío pendiente',
    '.rechazo - Rechazar un desafío pendiente',
    '.jugar - Jugar una ronda del juego activo'
];
handler.tags = ['game'];
handler.command = ['ppt', 'acepto', 'rechazo', 'jugar'];
handler.register = true;
export default handler;
