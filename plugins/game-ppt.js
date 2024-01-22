const activeGames = {};

const handler = async (m, { text, mentions }) => {
    if (!text) throw 'Elija piedra, papel o tijera';

    const validChoices = ['piedra', 'papel', 'tijera'];
    const userChoice = text.toLowerCase();

    if (!validChoices.includes(userChoice)) throw 'Elija piedra, papel o tijera';

    const opponent = mentions[0];
    if (!opponent) throw 'Menciona a otro usuario para jugar';

    m.reply(`@${opponent.id}, ${m.sender} quiere jugar a piedra, papel o tijera contigo. ¿Aceptas? (responde con .acepto o .rechazo)`);
    activeGames[m.sender] = { user: m.sender, opponent: opponent.id };
};

handler.acceptChallenge = async (m) => {
    if (activeGames[m.sender]) {
        const { user, opponent } = activeGames[m.sender];

        m.reply(`¡Perfecto! ${user} y ${opponent}, ambos jugadores, elijan piedra, papel o tijera.`);
        m.send(`¡Perfecto! ${user} y ${opponent}, ambos jugadores, elijan piedra, papel o tijera.`);
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
        const { user, opponent } = activeGames[m.sender];

        const validChoices = ['piedra', 'papel', 'tijera'];
        const userChoice = m.text.toLowerCase();

        if (!validChoices.includes(userChoice)) throw 'Elija piedra, papel o tijera';

        const botChoice = validChoices[Math.floor(Math.random() * validChoices.length)];

        // Lógica para determinar el resultado del juego
        const result = userChoice === botChoice ? '*Empate*' : (userChoice === 'piedra' && botChoice === 'tijera') || (userChoice === 'tijera' && botChoice === 'papel') || (userChoice === 'papel' && botChoice === 'piedra') ? `*@${user} ganó*` : `*@${opponent} ganó*`;

        m.reply(`${result}\n${user}: ${userChoice}\n${opponent}: ${botChoice}`);
        m.send(`${result}\n${user}: ${userChoice}\n${opponent}: ${botChoice}`);

        delete activeGames[m.sender];
    } else {
        throw 'No hay un juego en curso.';
    }
};

handler.help = [
    'ppt <piedra/papel/tijera>',
    '.ppt @usuario - Iniciar un juego de piedra, papel o tijera con otro usuario',
    '.acepto - Aceptar un desafío pendiente',
    '.rechazo - Rechazar un desafío pendiente',
    '.jugar <piedra/papel/tijera> - Jugar una ronda del juego activo'
];
handler.tags = ['game'];
handler.command = ['ppt', 'acepto', 'rechazo', 'jugar'];
handler.register = true;
export default handler;
