import fetch from 'node-fetch';

const timeoutDuration = 11000;
const bonusPoints = 10000;

const getApiData = async () => {
    const apiUrl = 'https://skizo.tech/api/game/tebakbendera?apikey=kasumabot';
    const response = await fetch(apiUrl);
    return response.json();
};

const sendFlagImage = (conn, m, imgUrl, textos) => {
    conn.sendFile(m.chat, imgUrl, 'bandera.jpg', textos, m);
};

const checkAnswer = async (conn, m, userAnswer, correctAnswer) => {
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    const replyMessage = isCorrect ? `¡Correcto! Has acertado.` : `¡Se acabó el tiempo!, intenta resolver de nuevo.`;
    await conn.reply(m.chat, replyMessage, conn.tekateki[m.chat][0]);

    // Puedes realizar acciones adicionales para cuando el usuario acierta aquí si es necesario
    if (isCorrect) {
        // Acciones adicionales...
    }

    delete conn.tekateki[m.chat];
};

const startFlagGame = async (conn, m) => {
    const id = m.chat;

    if (id in conn.tekateki) {
        conn.reply(m.chat, '¡Todavía hay un juego sin terminar!', conn.tekateki[id][0]);
        throw false;
    }

    const user = global.db.data.users[m.sender] || {};
    const userWait = user.wait || 0;
    const timeout = userWait + 40000;
    const textos = `*Adivina el nombre de la bandera de la foto.*
*Nota: Pusimos 2 minutos para poder visualizar la imagen bien ya que esta borrosa, estamos mejorando eso, en muy poco tiempo estara lista con foto hd*

*Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*Bono:* +${bonusPoints} Exp

Recuerda responder con el nombre completo!`.trim();

    conn.tekateki[id] = true;

    const data = await getApiData();
    sendFlagImage(conn, m, data.img, textos);

    setTimeout(async () => {
        if (conn.tekateki[id]) {
            const userAnswer = conn.tekateki[id][0].text;
            await checkAnswer(conn, m, userAnswer, data.name);

            user.wait = new Date() * 1;
            user.poin = (user.poin || 0) + bonusPoints;
            global.db.data.users[m.sender] = user;

        }
    }, timeout);
};

const handler = async (m, { conn, command, usedPrefix, args }) => {
    try {
        await startFlagGame(conn, m);
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = /^(adivinabandera|bandera|banderade|banderapais)$/i;

export default handler;
