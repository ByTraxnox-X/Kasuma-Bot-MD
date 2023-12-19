let handler = async(m, { conn }) => {
    const pp = './src/mapas/agendasemanal.jpg';

    let mensaje = `\t*AGENDA SEMANAL*`;

    conn.sendMessage(m.chat, { image: { url: pp }, caption: mensaje }, { quoted: m });
}

handler.help = ['agendasemanal'];
handler.tags = ['agenda'];
handler.command = /^(agendasemanal)$/i;

export default handler;
