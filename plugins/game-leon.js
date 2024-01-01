import fs from "fs"

let handler = async (m, { conn, text, usedPrefix, command, args }) => {

  conn.leons = conn.leons ? conn.leons : {}

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)



  if (command == 'leonsuelto') {
    m.reply(`Hola ${username}\nSoy *${pickRandom(global.nye)}*, Ayudame un leon me esta persiguiendo, y ya no puedo mas!!!`)
    throw `
      Para hacer algo por él, usa una de estas opciones
      *${usedPrefix + 'leon'} ayudar*
      *${usedPrefix + 'leon'} dejarlo*
    `
  }

  if (command == 'leon') {
    let users = global.db.data.users[m.sender]

    if (args[0] == "ayudar") {
      m.reply(`Estas Intentando Detener Al Leon Para Que No Lo Mate, ¿Necesitas un arma? Para comprar usa\n\n.leon arma`)
    }

    if (args[0] == "dejarlo") {
      let din = Math.floor(Math.random() * 25)
      global.db.data.users[who].dolares -= din
      m.reply(`Dejaste que el leon lo matara, por lo que eres sospechoso de la muerte, por lo cual perdiste $${din} Dolares.`)
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


function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}

global.nye = ["Sebastian - 🍷🗿","Guillermo - 🍷🗿","Carlos - 20 años","Mariana - 28 años","Alejandro - 34 años","Karla - 29 años","Sofia - 27 años","Daniel - 32 años","Isabel - 26 años","Ana - 31 años","Pedro - 23 años","Elena - 35 años","Ricardo - 22 años","Marisol - 33 años","Luis - 19 años","Lucia - 37 años","Pablo - 24 años","Carmen - 40 años","Martín - 21 años","Teresa - 36 años","Felipe - 28 años","María - 39 años","Andrés - 27 años","Jimena - 25 años","Roberto - 30 años","Mónica - 31 años","Diego - 26 años","Valentina - 29 años","Hernán - 33 años","Susana - 24 años","Juan - 38 años","Verónica - 22 años","Miguel - 33 años","Paola - 27 años","Esteban - 29 años","Rosa - 30 años","Antonio - 35 años","Lorena - 26 años","Gustavo - 31 años","Natalia - 24 años","Andrea - 39 años","Fernando - 28 años","Cecilia - 32 años","Raul - 40 años","Miriam - 21 años","Alejandra - 34 años","Roberto - 36 años","Victoria - 23 años"];