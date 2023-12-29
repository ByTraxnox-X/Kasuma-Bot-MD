let sessions = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let userSession = sessions[m.sender] || { stage: 'start' };

  if (command == 'rescatarprincesa') {
    if (userSession.stage === 'start' || args[0] === 'reiniciar') {
      userSession.stage = 'start';
      throw `Hola, soy la princesa, *Ohhh noo*
ayuda me están secuestrando
            
*${usedPrefix + 'princesa'} ayudar*
*${usedPrefix + 'princesa'} dejarla*
            `;
    } else {
      throw `Ya estás en medio de una acción. Puedes continuar desde donde quedaste usando el comando adecuado.\n\n${mostrarMensajeDeSesion(userSession)}`;
    }
  }

  if (command == 'princesa') {
    switch (userSession.stage) {
      case 'start':
        if (args[0] == "ayudar") {
          userSession.stage = 'running';
          throw `Estás corriendo a ayudarla, *te caes* andas cojo,\n\n.princesa seguir\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession)}`;
        }
        break;

      case 'running':
        if (args[0] == "dejarla") {
          userSession.stage = 'left';
          throw `Dejaste a la princesa.\n\n${mostrarMensajeDeSesion(userSession)}`;
        } else if (args[0] == "seguir") {
          userSession.stage = 'caught';
          throw `Te levantas del piso, luego de ese madrazo que te diste, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n.princesa desatarme\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession)}`;
        }
        break;

      case 'caught':
        if (args[0] == "desatarme") {
          userSession.stage = 'rescued';
          throw `Oh, te has desatado, ahora le estás dando duro, los golpeas, \nenemigo: por favor ya no, me rindo, estás con la princesa\n\n.princesa llevarla\n.princesa dejarla\n\n${mostrarMensajeDeSesion(userSession)}`;
        }
        break;

      case 'rescued':
        let users = global.db.data.users[m.sender];
        users.dolares += 250
        if (args[0] == "llevarla") {
          userSession.stage = 'completed';
          throw `Rescataste a la princesa, el rey te está agradeciendo mucho por ayudar a la princesa, de recompensa te va a dar $250\n\n${mostrarMensajeDeSesion(userSession)}`;
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
      return 'Estás al comienzo de la historia.';
    case 'running':
      return 'Estás corriendo para ayudar a la princesa.';
    case 'left':
      return 'Dejaste a la princesa.';
    case 'caught':
      return 'Te han atrapado, ¡cuidado!';
    case 'rescued':
      return 'Has rescatado a la princesa, ¡bien hecho!';
    case 'completed':
      return 'Has completado la historia.';
    default:
      return '';
  }
}

handler.help = handler.command = ['rescatarprincesa', 'princesa'];
handler.tags = ['game'];
export default handler;
