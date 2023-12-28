import fs from 'fs';

let timeout = 30000;
let defaultPoints = 1000;

let handler = async (m, { conn, usedPrefix }) => {
    let challenges = JSON.parse(fs.readFileSync("./src/game/challenges.json"));
    let currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    let caption = `*Desafío ${currentChallenge.id}:* ${currentChallenge.situation}

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${currentChallenge.points || defaultPoints} Exp

     *Elige una opción:*
1. ${currentChallenge.option1}
2. ${currentChallenge.option2}
    `.trim();

    conn.rpg = conn.rpg || {};
    conn.rpg[m.chat] = [
        await conn.reply(m.chat, caption, m),
        currentChallenge,
        currentChallenge.points || defaultPoints,
        1,
        setTimeout(async () => {
            if (conn.rpg[m.chat]) {
                await conn.reply(m.chat, `Se acabó el tiempo, intenta de nuevo.`, conn.rpg[m.chat][0]);
                delete conn.rpg[m.chat];
            }
        }, timeout)
    ];
};

let handleUserResponse = async (m, conn, userOption) => {
    if (!conn.rpg[m.chat]) return;
    let [reply, currentChallenge, points, level, timeoutID] = conn.rpg[m.chat];
    if (userOption !== 1 && userOption !== 2) {
        await conn.reply(m.chat, 'Elige una opción válida (1 o 2).', m);
        return;
    }
    let result = userOption === 1 ? currentChallenge.resultOption1 : currentChallenge.resultOption2;
    points += result.points || 0;
    level += 1;
    await conn.reply(m.chat, `Resultado: ${result}\n\nTu puntuación actual: ${points}\nTu nivel actual: ${level}`, reply);
    delete conn.rpg[m.chat];
    startNextChallenge(m, conn, level);
};


let startNextChallenge = async (m, conn, level) => {
    let challenges = JSON.parse(fs.readFileSync("./src/game/challenges.json"));
    let nextChallenge = challenges.find(challenge => challenge.id === level);

    if (!nextChallenge) {
        await conn.reply(m.chat, '¡Felicidades, has completado todos los desafíos!', m);
    } else {
        let caption = `*Desafío ${nextChallenge.id}:* ${nextChallenge.situation}

 *Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${nextChallenge.points || defaultPoints} Exp

    *Elige una opción:*
1. ${nextChallenge.option1}
2. ${nextChallenge.option2}
        `.trim();

        conn.rpg[m.chat] = [
            await conn.reply(m.chat, caption, m),
            nextChallenge,
            points,
            level,
            setTimeout(async () => {
                if (conn.rpg[m.chat]) {
                    await conn.reply(m.chat, `Se acabó el tiempo, intenta de nuevo.`, conn.rpg[m.chat][0]);
                    delete conn.rpg[m.chat];
                }
            }, timeout)
        ];
    }
};


handler.reply = async (m, { conn, text }) => {
    let userOption = parseInt(text.trim());

    if (isNaN(userOption) || userOption < 1 || userOption > 2) {
        return await conn.reply(m.chat, 'Elige una opción válida (1 o 2).', m);
    }
    handleUserResponse(m, conn, userOption);
};

handler.help = ['rpg'];
handler.tags = ['game'];
handler.command = /^(rpg)$/i;

export default handler;
