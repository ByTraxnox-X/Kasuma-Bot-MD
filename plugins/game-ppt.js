
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

    if (mode === '1vs1') {
        const opponent = args[1]?.replace('@', '');
        if (!opponent) throw 'Menciona a otro usuario para jugar';

        m.reply(`@${opponent}, ${m.sender} te desafía a un juego 1vs1 de piedra, papel o tijera. ¿Aceptas? (responde con .acepto o .rechazo)`);
        activeChallenges[m.sender] = { user: m.sender, opponent };
    }
};

handler.acceptChallenge = async (m) => {
    const challenge = activeChallenges[m.sender];
    if (challenge) {
        const { user, opponent } = challenge;

        m.reply(`¡Perfecto! Ambos jugadores, elijan piedra, papel o tijera.`);
        m.send(`@${opponent}, ${user} ha aceptado tu desafío. Ambos jugadores, elijan piedra, papel o tijera.`);

        // Resto de la lógica para gestionar el juego

        delete activeChallenges[m.sender];
    } else {
        throw 'No tienes un desafío pendiente.';
    }
};

// Definir las funciones restantes: rejectChallenge, playGame, help, tags, etc.

handler.tags = ['game'];
handler.command = ['ppt', 'acepto', 'rechazo', 'jugar'];
handler.register = true;
export default handler;