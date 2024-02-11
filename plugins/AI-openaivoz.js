import fetch from 'node-fetch';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const idioma = 'es';
const sistema1 = `Actuarás como un Bot de WhatsApp el cual fue creado por Sebastian, tú serás KasumaBot.`;

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;
  if (!text) throw 'Ingresa la petición';

  const apis = [
    { url: 'https://api.openai.com/v1/chat/completions', method: 'openai' },
    { url: 'https://api-fgmods.ddns.net/api/info/openai', method: 'fgapi' },
    { url: 'https://vihangayt.me/tools/chatgpt', method: 'vihangayt' },
    // Agrega otras APIs aquí
  ];

  for (const api of apis) {
    try {
      const respuesta = await getApiResponse(api, text);
      if (respuesta) {
        const audio = await tts(respuesta, idioma);
        await conn.sendMessage(m.chat, { audio, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
        return;
      }
    } catch (error) {
      // Manejar el error específico de la API si es necesario
      console.error(`Error en ${api.method} API: ${error.message}`);
    }
  }

  throw '> Sin respuesta\nNo se pudo obtener una respuesta de ninguna API.';
};

handler.help = ['chatgptvoz'];
handler.tags = ['ai'];
handler.command = /^(openaivoz|chatgptvoz|iavoz|robotvoz|openai2voz|chatgpt2voz|ia2voz|robot2voz|wavoz|wavoz|wavos|ai_voz|ai_voce)$/i;
export default handler;

async function getApiResponse(api, text) {
  const headers = { 'Content-Type': 'application/json' };
  let data;

  switch (api.method) {
    case 'openai':
      const openaiAPIKey = global.openai_key;
      const chgptdb = global.chatgpt.data.users[m.sender];
      chgptdb.push({ role: 'user', content: text });
      data = { model: 'gpt-3.5-turbo', messages: [{ role: 'system', content: sistema1 }, ...chgptdb] };
      break;

    case 'fgapi':
      data = { text, symsg: sistema1, apikey: 'XlwAnX8d' };
      break;

    case 'vihangayt':
      const response = await fetch(`${api.url}2?q=${text}`);
      const json = await response.json();
      data = json.data;
      break;

    // Agrega casos para otras APIs aquí

    default:
      throw new Error('Método de API no válido');
  }

  const response = await fetch(api.url, { method: 'POST', headers, body: JSON.stringify(data) });
  const result = await response.json();
  return result.result || null;
}

async function tts(text = 'error', lang = 'es') {
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date()) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}
