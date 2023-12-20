const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `Mencione a el nuevo *Miembro del equipo de moderadores*`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  switch (command) {
    case 'nuevomod':
      const nuevoNumero = who;
      global.owner.push([nuevoNumero]);
      await conn.reply(m.chat, 'Numero agregado a la *Seccion de moderadores*', m);
      break;
    case 'eliminarmod':
      const numeroAEliminar = who;
      const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, 'Numero eliminado de la *Seccion de moderadores*', m);
      } else {
        await conn.reply(m.chat, 'Numero ingresado no existe en la *Seccion.*', m);
      }
      break;
  }
};


handler.help = ['nuevomod', 'eliminarmod',]
handler.tags = ['owner'];
handler.command = /^(nuevomod|eliminarmod)$/i;
handler.owner = true

export default handler;
