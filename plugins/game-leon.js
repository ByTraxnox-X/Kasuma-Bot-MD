let handler = async (m, { conn, text, usedPrefix, command, args }) => {
  conn.leons = conn.leons ? conn.leons : {}

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)

const rutaArchivo = '/lib/NombresConEdades.js';

const contenidoArchivo = fs.readFileSync(rutaArchivo, 'utf8');
const nombresConEdades = eval(contenidoArchivo);

function obtenerNombreRandom() {
  const indiceRandom = Math.floor(Math.random() * nombresConEdades.length);
  return nombresConEdades[indiceRandom].split(' - ')[0]; 
}

const nombrerandom = obtenerNombreRandom();

  if (command == 'leonsuelto') {
    m.reply(`Hola ${username}, Soy ${nombrerandom}, Ayudame un leon me esta persiguiendo, y ya no puedo mas!!!`)
    throw `
      Para hacer algo por él, usa una de estas opciones
      *${usedPrefix + 'leon'} ayudar*
      *${usedPrefix + 'leon'} dejarlo*
    `
  }

  if (command == 'leon') {
    let users = global.db.data.users[m.sender]

    if (args[0] == "ayudar") {
      m.reply(`Estas Intentando Detener Al Leon Para Que No Mate, ¿Necesitas un arma? Para comprar usa\n\n.leon arma`)
    }

    if (args[0] == "dejarlo") {
      let din = Math.floor(Math.random() * 10)
      global.db.data.users[who].dolares -= din
      m.reply(`Dejaste que el leon lo matara, por lo que la policía eres sospechoso de la muerte, por lo cual perdiste $${din} Dolares.`)
    }

    if (args[0] == "arma") {
      let arm = Math.floor(Math.random() * 20)
      global.db.data.users[who].dolares -= arm
      m.reply(`Has Comprado Un Arma A ${arm} Dolares. Ahora Usa Estas Opciones De Abajo.\n\n.leon disparar\n.leon no disparar`)
    }

    if (args[0] == "disparar") {
      let user = global.db.data.users[who]
      let pointAttacker = Math.floor(Math.random() * 200)
      global.db.data.users[who].hp -= pointAttacker

      if (global.db.data.users[who].hp <= 0) {
        let target = args[0]
        let gan = Math.floor(Math.random() * 500)
        global.db.data.users[who].dolares += gan
        conn.reply(m.chat, `*Felicidades*\nEl leon acaba de morir porque se le acabaron los HP (puntos de salud), por lo que la persona que salvaste decidió darte $${gan}`, m, { contextInfo: { mentionedJid: [target] } })
      } else {
        m.reply(`Le has disparado al leon 🦁\nOh nooo El leon aun sigue vivo y con ${user.hp} de HP\nDebes Atacar Otra Vez Al Leon Para Matarlo\n.leon disparar`)
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }
}

handler.help = handler.command = ['leonsuelto', 'leon']
handler.tags = ['game']

export default handler