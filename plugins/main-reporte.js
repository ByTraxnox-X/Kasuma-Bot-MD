let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Ingrese un mensaje`
if (text.length < 10) throw `El reporte debe de tener minimo 10 caracteres`
if (text.length > 1000) throw `El reporte como maximo tiene que tener 1000 caracteres`
let teks = `*REPORTE DE FALLA*\n*Usuario:* wa.me/${m.sender.split`@`[0]}\n*Error:* ${text}`
let txt = '';
let count = 0;
for (const c of teks) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage('593995668111@s.whatsapp.net', { text: m.quoted ? teks + m.quoted.text : teks.trim(), mentions: conn.parseMention(teks) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
conn.reply('@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}})


let resp = `


Gracias por su reporte! le queremos indicar que estas acciones nos ayudan a tener mayor estabilidad en el bot, si este reporte es falso, puede tener consecuencias.`
for (const c of resp) {
    await new Promise(resolve => setTimeout(resolve, 50));
    txt += c;
    count++;

    if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing' , m.chat);
    }
}
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} );
}
handler.help = ['reporte'].map(v => v + ' <texto>')
handler.tags = ['main']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes)$/i
export default handler
