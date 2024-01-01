let handler = async(m, { conn, text, sleep, usedPrefix, command, args }) => {
  conn.leons = conn.leons ? conn.leons : {}

import faker from 'faker';


// Generar un nombre aleatorio
const randomName = faker.name.findName();
console.log(randomName);
 
  if (command == 'leonsuelto') {
    m.reply(`*Hola, ${pushname} Soy ${randomName}, Ayudame un leon me esta persiguiendo, y ya no puedo mas!!!`)
    await sleep(3000)
      throw `
      Pa
      
        *${usedPrefix + 'leon'} ayudar*
        *${usedPrefix + 'leon'} dejarlo*
      `

  }

  if (command == 'princesa') {
      let users = global.db.data.users[m.sender]



      if (args[0] == "ayudar"){
    m.reply(`Estas Intentando Detener Al Leon Para Que No Mate A ${pushname}, Nesesitas un arma? Para comprar use\n\n.leon arma`)
    }

    if (args[0] == "dejarlo"){
      let din = Math.floor(Math.random() * 10)
      global.db.data.users[who].dolares -= din
      
    m.reply('Dejastes que el leon lo matara, por lo que la policía eres sospechoso de la muerte, por lo cual perdiste $${din} Dolares.')
    }

    if (args[0] == "arma"){
      let arm = Math.floor(Math.random() * 20)
      global.db.data.users[who].dolares -= arm
    m.reply('Has Comprado Un Arma A $${arm} Dolares. Ahora Usa Estas Opciones De Abajo.\n\n.leon disparar\n.leon no disparar')
    }

    if (args[0] == "disparar"){
      conn.leons[m.chat][i].hp -= pointAttacker * 300
    m.reply(`Le has disparado al leon 🦁\nOh nooo El leon aun sigue vivo y con ${pointAttacker * 300}\nDebes Atacar Otra Vez Al Leon Para Matarlo\n.leon disparar`)
    await sleep(2000)
    let  target = args[0]
    let gan = Math.floor(Math.random() * 500)
      global.db.data.users[who].dolares += gam
    if (conn.leons[m.chat][i].hp <= 0) conn.reply(m.chat,`*Felicidades*\nEl leon acaba de morir porque se le acabaron los HP (puntos de salud), por lo a la persona que salvaste decidió darte $${gan}*`,m, {contextInfo : {mentionedJid : [target]}})
    
    }


  }


}}

handler.help = handler.command = ['leonsuelto', 'leon']
handler.tags = ['game']
export default handler