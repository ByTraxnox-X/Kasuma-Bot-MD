import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a word to search for.';

  const url = `${diccionario}/v0/define?term=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw `Error`;
  }

  if (!json.list.length) {
    throw 'Palabra no encontrada';
  }

  const firstEntry = json.list[0];
  const definition = firstEntry.definition;
  const example = firstEntry.example ? `*Ejemplo:* ${firstEntry.example}` : '';

  const message = `*Palabra:* ${text}\n*Definicion:* ${definition}\n${example}`;
  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m });
};

handler.help = ['diccionario <palabra>'];
handler.tags = ['tools'];
handler.command = /^diccionario/i;

export default handler;
