/*
const handler = async (m, { text }) => {
    if(!text) throw 'Elija mpiedra, papel o tijera';
    const o = ['piedra', 'papel', 'tijera'];
    const a = o[Math.floor(Math.random() * o.length)];
    if(!o.includes(text.toLowerCase())) throw 'Elija piedra, papel o tijera';
    let r = text === a ? '*Empate*' : (text === 'piedra' && a === 'tijera') || (text === 'tijera' && a === 'papel') || (text === 'papel' && a === 'piedra') ? '*Ganaste*' : '*Perdiste*';
    let p = r === '*Empate*' ? '(±)100 XP' : r === '*Ganaste*' ? '*+300 XP*' : '*-300 XP*';
    global.db.data.users[m.sender].exp += r === '*Empate*' ? 100 : r === '*Ganaste*' ? 300 : -300;
    m.reply(`${r}\nTú: ${text}\nKasuma: ${a}\n\nPuntos ${p}`);
};
handler.help = ['ppt <piedra/papel/tijera>'];
handler.tags = ['game'];
handler.command = ['ppt'];
handler.register = false;
export default handler;*/