import summary from 'node-summary';

let handler = async (m, { conn, args }) => {
    let textToSummarize = args.join(' ');

    if (!textToSummarize) throw 'Por favor, proporciona un texto para resumir.';

    summary.summarize(textToSummarize, (err, summaryText) => {
        if (err) throw 'Error al resumir el texto.';

        conn.sendMessage(m.chat, `Resumen:\n${summaryText}`, 'text', { quoted: m });
    });
};

handler.help = ['resumen <texto>'];
handler.tags = ['tools'];
handler.command = ['resumen'];

export default handler;