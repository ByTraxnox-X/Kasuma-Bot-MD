import fetch from 'node-fetch';
import {webp2png} from '../lib/webp2mp4.js';

const handler = async (m, {conn}) => {

  const q = m.quoted ? m.quoted : m;

  const mime = (q || q.msg).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {

    const url = await webp2png(await q.download());
    const res = await fetch(API(`${apiocr}`, '/parse/imageurl', {apikey: `${apiketocr}`, url}));
    if (res.status !== 200) throw res.statusText;

    const json = await res.json();
    m.reply(json?.ParsedResults?.[0]?.ParsedText);

  } 
  else throw 'Error.';
};


handler.help = ['convtexto']
handler.tags = ['tools']
handler.command = /^totexto|convtexto$/i;

export default handler;
