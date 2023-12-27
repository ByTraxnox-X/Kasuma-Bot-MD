import fetch from 'node-fetch';


const handler = async (m, { conn, args }) => {




const k = Math.floor(Math.random() * 70);
const vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`;
conn.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted : m})}



handler.help = ['au'];
handler.tags = ['dl'];
handler.command = ['audiorandom'];

export default handler;