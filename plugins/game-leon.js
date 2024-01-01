let handler = async(m, { conn, text, usedPrefix, command, args }) => {
conn.leons = conn.leons ? conn.leons : {}
conn.leons2 = conn.leons2 ? conn.leons2 : {}


let toUser = `${m.sender.split("@")[0]}`


let turn = x
let pointAttacker = 0
    let time = conn.leons2[m.chat].time
    await sleep(90000)
    let timeNow = conn.leons2[m.chat].time
    if (time == timeNow){
      conn.leons[m.chat].hp -= 2500
      conn.reply(m.chat,`*@${conn.leons[m.chat][turn].user.split('@')[0]} sedang AFK (Denda -2500 HP)*\n\n.leons player = statistik pemain\n.attack @tag = serang lawan`,null,{contextInfo : {mentionedJid : [conn.leons[m.chat][turn].user]}})
      await (3000)
      // comprueba si está muerto
      if (conn.leons[m.chat][turn].hp <= 0) {
        conn.reply(m.chat,`*@${conn.leons[m.chat][turn].user.split('@')[0]} está muerto porque HP (puntos de salud) está agotado.*`,null,{contextInfo : {mentionedJid : [conn.leons[m.chat][turn].user]}})

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

 
  if (command == 'leonsuelto') {

    m.reply(`*Hola, ${toUser} Soy Sebastian, Ayudame un leon me esta persiguiendo, y ya no puedo mas!!!`)

    m.reply(`*Hola, ${toUser} Soy Parqui, Ayudame un leon me esta persiguiendo, y ya no puedo mas!!!`)

      throw `
      Para hacer algo por el, usa una de estas opciones
      
        *${usedPrefix + 'leon'} ayudar*
        *${usedPrefix + 'leon'} dejarlo*
      `

  }

  if (command == 'leon') {
      let users = global.db.data.users[m.sender]



      if (args[0] == "ayudar"){
    m.reply(`Estas Intentando Detener Al Leon Para Que No Mate A ${toUser}, Nesesitas un arma? Para comprar use\n\n.leon arma`)
    }

    if (args[0] == "dejarlo"){
      let din = Math.floor(Math.random() * 10)
      global.db.data.users[who].dolares -= din
      
    m.reply(`Dejastes que el leon lo matara, por lo que la policía eres sospechoso de la muerte, por lo cual perdiste $${din} Dolares.`)
    }

    if (args[0] == "arma"){
      let arm = Math.floor(Math.random() * 20)
      global.db.data.users[who].dolares -= arm
    m.reply(`Has Comprado Un Arma A ${arm} Dolares. Ahora Usa Estas Opciones De Abajo.\n\n.leon disparar\n.leon no disparar`)
    }

    if (args[0] == "disparar"){
      global.db.data.users[who].hp -= pointAttacker * 300
    m.reply(`Le has disparado al leon 🦁\nOh nooo El leon aun sigue vivo y con ${pointAttacker * 300}\nDebes Atacar Otra Vez Al Leon Para Matarlo\n.leon disparar`)

    await 5000
    
    let  target = args[0]
    let gan = Math.floor(Math.random() * 500)
      global.db.data.users[who].dolares += gan
    if (conn.leons[m.chat].hp <= 0) conn.reply(m.chat,`*Felicidades*\nEl leon acaba de morir porque se le acabaron los HP (puntos de salud), por lo a la persona que salvaste decidió darte $${gan}*`,m, {contextInfo : {mentionedJid : [target]}})
    
    }


  }

}
}

handler.help = handler.command = ['leonsuelto', 'leon']
handler.tags = ['game']
export default handler