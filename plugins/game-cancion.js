import fetch from 'node-fetch';
import axios from 'axios';

const timeout = 30000;
const poin = 1000;

let handler = async(m, { conn, usedPrefix, command }) => {
    if (command == "adivinacancion") {
        conn.adivina_la_cancion = conn.adivina_la_cancion ? conn.adivina_la_cancion : {};
        const id = m.chat;
        if (id in conn.adivina_la_cancion) {
          conn.reply(m.chat, 'Todavía hay canciones sin respuesta en este chat.', conn.adivina_la_cancion[id][0]);
          throw false;
        }
        const res = await fetchJson(`https://raw.githubusercontent.com/ByTraxnox-X/Kasuma-Bot-MD/main/src/game/adivina_la_cancion.json`);
        const json = res[Math.floor(Math.random() * res.length)];
        const caption = `ADIVINA EL TITULO DE LA CANCION\n\nTiempo: ${(timeout / 1000).toFixed(2)} segundos:\nEscribe *${usedPrefix}pista* Para obtener una pista\nPremio: ${poin} XP\n\nDEBES RESPONDER A ESTE MENSAJE CON LAS RESPUESTAS!!`.trim();
        conn.adivina_la_cancion[id] = [
          await m.reply(caption),
          json, poin,
          setTimeout(() => {
            if (conn.adivina_la_cancion[id]) conn.reply(m.chat, `Se acabó el tiempo!\nLa respuesta es ${json.respuestas_kasumabot}`, conn.adivina_la_cancion[id][0]);
            delete conn.adivina_la_cancion[id];
          }, timeout),
        ];
        const aa = await conn.sendMessage(m.chat, { audio: { url: json.link_song }, fileName: `error.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        if (!aa) return conn.sendFile(m.chat, json.link_song, 'coba-lagi.mp3', '', m);
      };

      if (command == "pista") {
        conn.adivina_la_cancion = conn.adivina_la_cancion ? conn.adivina_la_cancion : {};
        const id = m.chat;
        if (!(id in conn.adivina_la_cancion)) throw false;
        const json = conn.adivina_la_cancion[id][1];
        const uwukasuma = json.respuestas_kasumabot;
        const adivina_la_cancion_pista = uwukasuma.replace(/[bcdfghjklmnñpqrstvwxyzBCDEFGHJKLMNÑPQRSTVWXYZ]/g, '_');
        m.reply('' + adivina_la_cancion_pista + '');
      };
      }
    
    handler.help = ['adivinacancion']
    handler.command = ['adivinacancion' , 'pista']
    handler.tags = ['game']
    export default handler

    async function fetchJson(url, options) {
        try {
          options ? options : {};
          const res = await axios({ method: 'GET', url: url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }, ...options });
          return res.data;
        } catch (err) {
          return err;
        }
      }
      