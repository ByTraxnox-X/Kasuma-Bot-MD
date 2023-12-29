let sessions = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const userSession = sessions[m.sender] || {};

    if (command == 'rescatarprincesa') {
        if (!userSession.stage) {
            userSession.stage = 'start';
            throw `
            Hola, soy la princesa, *Ohhh noo*
            ayuda me están secuestrando
            
              *${usedPrefix + 'princesa'} ayudar*
              *${usedPrefix + 'princesa'} dejarla*
            `;
        } else {
          throw `Ya estás en medio de una acción. Puedes continuar desde donde quedaste usando el comando ${usedPrefix}princesa ${userSession.stage === 'running' ? 'seguir' : 'dejarla'} o ${usedPrefix}princesa dejarla.`;
        }
    }

    if (command == 'princesa') {
        let users = global.db.data.users[m.sender];

        switch (userSession.stage) {
            case 'start':
                if (args[0] == "ayudar") {
                    userSession.stage = 'running';
                    m.reply(`Estás corriendo a ayudarla, *te caes* andas cojo,\n\n.princesa seguir\n.princesa dejarla?`);
                }
                break;

            case 'running':
                if (args[0] == "dejarla") {
                    userSession.stage = 'left';
                    m.reply('Dejaste a la princesa');
                } else if (args[0] == "seguir") {
                    userSession.stage = 'caught';
                    m.reply('Te levantas del piso, luego de ese madrazo que te diste, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n.princesa desatarme\n.princesa dejarla');
                }
                break;

            case 'caught':
                if (args[0] == "desatarme") {
                    userSession.stage = 'rescued';
                    m.reply('Oh, te has desatado, ahora le estás dando duro, los golpeas, \nenemigo: por favor ya no, me rindo, estás con la princesa\n\n.princesa llevarla\n.princesa dejarla');
                }
                break;

            case 'rescued':
                if (args[0] == "llevarla") {
                    userSession.stage = 'completed';
                    m.reply('Rescataste a la princesa, el rey te está agradeciendo mucho por ayudar a la princesa, de recompensa te va a dar $250');
                    users.dolares += 250;
                    delete sessions[m.sender];
                }
                break;

            default:
                throw 'Error desconocido.';
        }
    }
}

handler.help = handler.command = ['rescatarprincesa', 'princesa'];
handler.tags = ['game'];
export default handler;
