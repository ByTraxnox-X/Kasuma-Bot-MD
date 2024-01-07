import {createHash} from 'crypto';
import {canLevelUp, xpRange} from '../lib/levelling.js';
// import db from '../lib/database.js'

const handler = async (m, {conn, usedPrefix, command}) => {
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  if (!(who in global.db.data.users)) throw `El usuario aun no envia un mensaje`;
  const user = global.db.data.users[who];
  m.reply(`*Mensajes enviados por el usuario:* ${user.Mensaje}`);
};
handler.help = ['actividad @user'];
handler.tags = ['group'];
handler.command = /^actividad$/i;
handler.admin = true

export default handler;
