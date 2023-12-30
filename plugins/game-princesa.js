let sessions = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let userSession = sessions[m.sender] || { stage: 'start' };

  if (command == 'rescatarprincesa') {
    if (userSession.stage === 'start' || args[0] === 'reiniciar') {
      userSession.stage = 'start';
      throw `
La princesa Mirabel esta siendo secuestrada!, actua de la mejor manera para rescatarla!
            
*${usedPrefix + 'princesa'} ayudar*
*${usedPrefix + 'princesa'} dejarla*
            `;
    } else {
      throw `${mostrarMensajeDeSesion(userSession)}`;
    }
  }

  if (command == 'princesa') {
    switch (userSession.stage) {
      case 'start':
        if (args[0] == "ayudar") {
          userSession.stage = 'running';
          m.reply(`Estás corriendo a ayudarla, *te caes* andas cojo,\n\n*${usedPrefix}princesa seguir*\n*${usedPrefix}princesa dejarla*`);
        }
        break;

      case 'running':
        if (args[0] == "dejarla") {
          userSession.stage = 'left';
          m.reply('Dejaste a la princesa');
        } else if (args[0] == "seguir") {
          userSession.stage = 'follow';
          m.reply(`Te levantas del piso, luego de ese madrazo que te diste, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n*${usedPrefix}princesa desatarme*\n*${usedPrefix}princesa dejarla*`);
        }
        break;

      case 'caught':
        if (args[0] == "desatarme") {
          userSession.stage = 'rescued';
          m.reply(`Oh, te has desatado, ahora le estás dando duro, los golpeas, \nenemigo: porfavor ya no, me rindo, estás con la princesa\n\n*${usedPrefix}princesa llevarla*\n*${usedPrefix}princesa dejarla*`);
        }
        break;

      case 'rescued':
        if (args[0] == "llevarla") {
          userSession.stage = 'completed';
          m.reply(`Rescataste a la princesa, el rey te está agradeciendo mucho por ayudar a la princesa, de recompensa te va a dar *$250*`);
          let users = global.db.data.users[m.sender];
          users.dolares += 250;
          delete sessions[m.sender];
        }
        break;

      default:
        throw `Error desconocido en la etapa ${userSession.stage}.`;
    }
  }

  sessions[m.sender] = userSession;
}

function mostrarMensajeDeSesion(userSession) {
  switch (userSession.stage) {
    case 'start':
      return `Hola, soy la princesa, *Ohhh noo*\nayuda me están secuestrando\n\n*${usedPrefix + 'princesa'} ayudar*\n\n*${usedPrefix + 'princesa'} dejarla*`;
    case 'running':
      return `Estás corriendo a ayudarla, *te caes* andas cojo,\n\n.princesa seguir\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession.stage)}`;
    case 'left':
      return `Te levantas del piso, luego de ese madrazo que te diste, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n.princesa desatarme\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession.stage)}`;
    case 'follow':
      return `Te levantas del piso, luego de ese madrazo que te diste, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n.princesa desatarme\n.princesa dejarla`;
    case 'caught':
      return `Oh, te has desatado, ahora le estás dando duro, los golpeas, \nenemigo: por favor ya no, me rindo, estás con la princesa\n\n.princesa llevarla\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession.stage)}`;
    case 'rescued':
      return `Rescataste a la princesa, el rey te está agradeciendo mucho por ayudar a la princesa, de recompensa te va a dar $250\n\n${mostrarMensajeDeSesion(userSession.stage)}`;
    case 'completed':
      return `Has completado la historia.`;
    default:
      return '';
  }
}

handler.help = handler.command = ['rescatarprincesa', 'princesa'];
handler.tags = ['game'];
export default handler;
