let games = {};
let db = {};

const startGame = (player1, player2) => {
    const gameId = Math.random().toString(36).substring(7);
    games[gameId] = {
        players: [player1, player2],
        scores: [0, 0],
        currentPlayer: Math.floor(Math.random() * 2), // Randomly choose starting player
        turn: 1,
        maxGoals: 10,
    };
    return gameId;
};

const playRound = (gameId, playerIndex) => {
    const game = games[gameId];
    if (!game) throw "Juego no encontrado.";

    console.log("Juego:", game);

    if (playerIndex !== game.currentPlayer) {
        throw "No es tu turno.";
    }

    const opponentIndex = playerIndex === 0 ? 1 : 0;

    if (Math.random() < 0.5) {
        game.scores[playerIndex]++;
        db[game.players[playerIndex]] = db[game.players[playerIndex]] || 0;
        db[game.players[playerIndex]]++;
        if (game.scores[playerIndex] >= game.maxGoals) {
            delete games[gameId];
            return `${game.players[playerIndex]} anotó un gol! ¡Ha ganado el juego! Puntaje: ${game.scores.join(" - ")}`;
        } else {
            game.currentPlayer = opponentIndex;
            game.turn++;
            return `${game.players[playerIndex]} anotó un gol! Puntaje: ${game.scores.join(" - ")}`;
        }
    } else {
        game.currentPlayer = opponentIndex;
        game.turn++;
        return `${game.players[playerIndex]} falló el intento de gol. Puntaje: ${game.scores.join(" - ")}`;
    }
};

const endGame = (gameId) => {
    delete games[gameId];
    return "Juego finalizado. Gracias por jugar!";
};

const handler = async (m, { conn, args }) => {
    console.log("Argumentos:", args);
    const user1 = m.mentionedJid ? m.mentionedJid[0] : m.quoted.sender;
    const user2 = m.sender ? m.sender : m.quoted.sender;

    if (!user1 || !user2) {
        return m.reply("No se pudo obtener la información de los usuarios.");
    }

    const gameId = startGame(user1, user2);
    console.log("ID del juego:", gameId);
    return m.reply(`¡Juego de Pelota de Gol iniciado! ID del juego: ${gameId}\n${user1} vs ${user2}`);
};

handler.play = async (m, { conn, args }) => {
    console.log("Argumentos de juego:", args);
    const gameId = args[0];
    const playerIndex = parseInt(args[1]) - 1; // Player index is 0-based

    if (isNaN(playerIndex) || ![0, 1].includes(playerIndex)) {
        return m.reply("Por favor, ingresa el número de jugador (1 o 2).");
    }

    try {
        const result = playRound(gameId, playerIndex);
        return m.reply(result);
    } catch (error) {
        return m.reply(error);
    }
};

handler.end = async (m, { conn, args }) => {
    console.log("Argumentos de finalización:", args);
    const gameId = args[0];
    return m.reply(endGame(gameId));
};

handler.help = ['gol @usuario', 'gol jugar <ID del juego> <número de jugador (1 o 2)>', 'gol terminar <ID del juego>'];
handler.tags = ['game'];
handler.command = ['gol'];
handler.group = true;
handler.private = false;

export default handler;
