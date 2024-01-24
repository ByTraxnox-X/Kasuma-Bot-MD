import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `Ingrese una  peticion`;
    await conn.sendMessage(m.chat, {text: 'Realizando...'}, {quoted: m});
  try {
    const tiores1 = await fetch(`${apivisionary}/api/imagine?text=${text}`);
    const json1 = await tiores1.json();
    await conn.sendMessage(m.chat, {image: {url: json1.data}}, {quoted: m});
  } catch {  
      console.log('Error');  
  try {
    const tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`);
    await conn.sendMessage(m.chat, {image: {url: tiores2.data}}, {quoted: m});
  } catch {
      console.log('Error');
  try {
    const tiores3 = await fetch(`${apivisionary}/api/Lexicaart?text=${text}`);
    const json3 = await tiores3.json();
    await conn.sendMessage(m.chat, {image: {url: json3.data[0].images[0].url}}, {quoted: m});
  } catch {
      console.log('Error');
  try {
    const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
    await conn.sendMessage(m.chat, {image: {url: tiores4.data}}, {quoted: m});
  } catch {
    console.log('Ninguna API funciona');
    throw `Error`;
  }}
 }}
};
handler.help = ['dalle']
handler.tags = ['ai']
handler.command = /^(dalle)$/i
export default handler;
