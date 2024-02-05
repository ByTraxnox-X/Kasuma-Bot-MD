import axios from 'axios';

const timeout = 18000;
const poin = 10000;

const handler = async (m, { conn, usedPrefix }) => {
    try {
        const res = await axios.get('https://apikasu.onrender.com/api/game/bandera?apikey=SebastianDevelop');
        const json = res.data;
        const correctAnswer = json.result.name.toLowerCase();
        const imageUrl = json.result.img;
        const caption = `
ⷮ Bandera Mystery

Adivina la bandera de qué país es esta?

Tiempo: ${(timeout / 1000).toFixed(2)} segundos
Bono: +${poin} Exp
`.trim();

        const sentMessage = await conn.sendFile(m.chat, imageUrl, 'bandera.jpg', caption, m);

        const timeoutId = setTimeout(async () => {
            await conn.reply(m.chat, "Se acabó el tiempo!, intenta adivinar la bandera de nuevo.", sentMessage);
        }, timeout);

        conn.commandAddTimeout(m.chat, usedPrefix + 'bandera', timeoutId);

        conn.on('text', (userAnswer, id, from) => {
            if (id === m.chat && userAnswer.toLowerCase() === correctAnswer) {
                clearTimeout(timeoutId);
                conn.reply(m.chat, `¡Correcto! Has ganado ${poin} Exp.`, sentMessage);
            }
        });

    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'Ocurrió un error al cargar la bandera. Inténtalo de nuevo más tarde.', m);
    }
};

handler.help = ['bandera'];
handler.tags = ['game'];
handler.command = /^(bandera|adivinarbandera|flag)$/i;

export default handler;
