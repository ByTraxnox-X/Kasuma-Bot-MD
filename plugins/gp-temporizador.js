const users = global.db.data.users;
const timers = {}; 

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.includes('@')) {
    m.reply('formato incorrecto, ingrese la duracion (m/h)');
    return;
  }

  const durationText = `duracion no valida, ingrese una duracion entre 1 minuto y 1 hora.\n\n*Ejemplo:* ${usedPrefix + command} 2m @tag. para poner un limite de tiempo de 2 minutos, si deseas en horas, debes cambiar la "M" por "h"`;
  const menzione = m.mentionedJid[0] || '';

  if (!menzione) {
    m.reply('mencione al usuario');
    return;
  }

  const timeInput = text.split(' ')[0].toLowerCase();
  let duration = 0;

  if (timeInput.endsWith('m')) {
    duration = parseInt(timeInput) * 60 * 1000; 
  } else if (timeInput.endsWith('h')) {
    duration = parseInt(timeInput) * 60 * 60 * 1000; 
  }

  if (duration >= 60000 && duration <= 86400000) {
    users[menzione] = { muto: true };

    m.reply(`tiene *${timeInput}* para escribir un mensaje, o si no, sera eliminado.`);

    timers[menzione] = setTimeout(async () => {
      if (users[menzione] && users[menzione]) {
        users[menzione] = false;

        const rand = Math.random() < 0.5 ? 'testa' : 'croce';
        let msg = '';

        if (rand === 'testa') {
          await conn.groupParticipantsUpdate(m.chat, [menzione], 'remove');
          msg = `fue eliminado por el limite de tiempo para enviar un mensaje.`;
        } else {
          msg = `ha enviado un mensaje antes del tiempo limite, no sera eliminado.`;
        }

        m.reply(msg);
      }
    }, duration);

      ('chat-update', async (chatUpdate) => {
      if (
        chatUpdate.jid === menzione &&
        chatUpdate.hasNewMessage &&
        chatUpdate.messages.some((msg) => msg.key.fromMe === false)
      ) {

        clearTimeout(timers[menzione]);
        m.reply('El usuario envio un mensaje, su eliminacion fue anulada y el temporizador reiniciado.');
        timers[menzione] = null; 
      }
    });
  } else {
    m.reply(durationText);
  }
};
handler.help = ['temporizador']
handler.tags = ['group']
handler.command = /^temporizador$/i;
handler.admin = true;

export default handler;