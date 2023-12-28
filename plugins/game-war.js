/*let handler = async (m, { conn, usedPrefix, args, command }) => {
  conn.war = conn.war ? conn.war : {}
  conn.war2 = conn.war2 ? conn.war2 : {}

  if (!args[0] || args[0] == "help") return m.reply(`*❏  W A R - Z O N E*

[1] Warzone es un juego de guerra con sistema de ataque por turnos o turnos para atacar
[2] El juego puede comenzar con 1v1 hasta 5v5.
[3] El capital de guerra es el botín de guerra si tu equipo gana.
[4] Cada jugador obtendrá 7000 HP (puntos de salud)
[5] El éxito de un ataque depende de tu nivel y del nivel del enemigo al que estás atacando.
[6] La posibilidad de atacar es de 40 segundos, más de eso se considera AFK (reducción de 2500 HP)
[7] Un equipo ganará si el equipo contrario lo pierde todo (HP <= 0) y se queda con el botín de guerra.

*❏  COMANDOS*
*${usedPrefix + command} join A/B* = Unete al juego
*${usedPrefix + command} left* = salir del juego
*${usedPrefix + command} dolares 10xx* = apostar dinero
*${usedPrefix + command} player* = juego de jugador
*${usedPrefix + command} start* = empezar juego`)


  if (args[0] == "dolares"){
    if (!(m.chat in conn.war)) return m.reply(`*Primero cree una sala (escriba .war join)*`)
    if(m.sender == conn.war[m.chat][0].user){
      if (args[1] != "undefined" && !isNaN(args[1])){
        args[1] = parseInt(args[1])
        if (args[1] < 10) return m.reply('*Mínimo RP: 10*')
        conn.war2[m.chat].dolares = args[1]
        return m.reply("*Capital de guerra establecida con éxito de RP. " + Number(args[1]).toLocaleString() + "*")
      }else {
        return m.reply("*Introduce el capital de la apuesta de guerra en forma de números (No se pueden utilizar puntos)*\n\n.war dolares 10000")
      }
    }else {
      return conn.reply(m.chat,`*Solo @${conn.war[m.chat][0].user.split('@')[0]} como un creador de habitaciones que puede reemplazar el capital de guerra inicial*`,m, {contextInfo : {mentionedJid : [conn.war[m.chat][0].user]}})
    }
  }

  // JOIN
  if (args[0] == "join"){
    
    if (global.db.data.users[m.sender].dolares < 39) return m.reply("*Su dinero debe ser al menos Rp. 40 para jugar este juego.*")

    if (!(m.chat in conn.war)) {
      conn.war2[m.chat] = {"war" : false, "turn" : 0, "time" : 0, "dolares" : 0}
      conn.war[m.chat] = []
      let exp = global.db.data.users[m.sender].exp
      conn.war[m.chat][0] = {"user": m.sender, "hp": 5000, "lvl": global.db.data.users[m.sender].level, "turn" : false}
      for (let i=1;i<10;i++){
        conn.war[m.chat][i] = {"user": "", "hp" : 0, "lvl" : 0, "turn" : false}
      }
      return m.reply(`*Ingresa exitosamente al juego como Equipo A.*\n\n*.war join a/b* = join game\n*.war start* = comenzar el juego`)
    }else {
    
      if (conn.war2[m.chat].war) {
        return m.reply(`*El juego ha comenzado, no puedes unirte..*`)
      }

      for (let i = 0; i < conn.war[m.chat].length ; i++) {
        if (m.sender == conn.war[m.chat][i].user){
          let total = 0
          for (let i = 0 ; i < 10 ; i++) {
            if (conn.war[m.chat][i].user == ""){
              total += 1
            }
          }
          return m.reply(`*Has entrado al juego*\n\n*.war join a/b* = join game\n*.war start* = comenzar el juego`)
        }
      }
      

      if (args[1]){
        if (args[1].toLowerCase() == "a"){
          if (conn.war2[m.chat].dolares == 0) return conn.reply(m.chat,`*Ayuda @${conn.war[m.chat][0].user.split('@')[0]} establecer la capital inicial de la guerra (Minimo Rp. 100)*\n\n.war dolares 100`,m, {contextInfo : {mentionedJid : [conn.war[m.chat][0].user]}})
          return m.reply('a')
          if (global.db.data.users[m.sender].dolares < conn.war2[m.chat].dolares) return m.reply(`*Tu dinero es minimo Rp. ${conn.war2[m.chat].dolares.toLocaleString()} para jugar este juego.*`)
          for (let i = 1 ; i < 5 ; i++) {
            if (conn.war[m.chat][i].user == ""){
              let exp = global.db.data.users[m.sender].exp
              conn.war[m.chat][i] = {"user" : m.sender, "hp" : 7000, "lvl" : global.db.data.users[m.sender].level, "turn" : false}
              let total = 0
              for (let i = 0 ; i < 10 ; i++) {
                if (conn.war[m.chat][i].user == ""){
                  total += 1
                }
              }
              return m.reply(`*Ingresa exitosamente al juego como equipo. A*\n\n*.war join a/b* = join game\n*.war start* = comenzar el juego`)
            }
          } 
        }else if (args[1].toLowerCase() == "b"){
          if (conn.war2[m.chat].dolares == 0) return conn.reply(m.chat,`*Ayuda @${conn.war[m.chat][0].user.split('@')[0]} establecer el capital inicial de la guerra (mínimo Rp. 100)*\n\n.war dolares 100`,m, {contextInfo : {mentionedJid : [conn.war[m.chat][0].user]}})
          if (global.db.data.users[m.sender].dolares < conn.war2[m.chat].dolares) return m.reply(`*Tu dinero es minimo Rp. ${conn.war2[m.chat].dolares.toLocaleString()} para jugar este juego.*`)
          for (let i = 5 ; i < 10 ; i++) {
            if (conn.war[m.chat][i].user == ""){
              let exp = global.db.data.users[m.sender].exp
              conn.war[m.chat][i] = {"user" : m.sender, "hp" : 7000, "lvl" : global.db.data.users[m.sender].level, "turn" : false}
              let total = 0
              for (let i = 0 ; i < 10 ; i++) {
                if (conn.war[m.chat][i].user == ""){
                  total += 1
                }
              }
              return m.reply(`*Ingresa exitosamente al juego como equipo. B*\n\n*.war join a/b* = join game\n*.war start* = comenzar el juego`)
            }
          }
        }else {
          return m.reply(`*Elija el equipo A o B*\n\n.war join A\n.war join B`)
        }
      }else {

        return m.reply(`*Elija el equipo A o B*\n\n.war join A\n.war join B`)
      }
      


      for (let i = 0 ; i < conn.war[m.chat].length ; i++) {
        let total = 0
        if (conn.war[m.chat][i].user != ""){
          total += 1
        }
        if (total == 10) conn.war2[m.chat].war = true
      }
    }
  }


  if (args[0] == "left"){

    if (conn.war2[m.chat].war) {
      m.reply(`*La guerra ha comenzado, no puedes salir.*`)
    }else {
      for (let i = 0 ; i < 10 ; i++) {
        if (m.sender == conn.war[m.chat][i].user){
          return m.reply(`*Salir del juego con éxito*`)
        }
      }
      return m.reply(`*no estas en el juego*`)
    }
  }


  if (args[0] == "player"){ 
    if (!(m.chat in conn.war)) return m.reply(`*No hay jugadores uniéndose a la sala. War Zone*`)
    var teamA = []
    var teamB = []
    var teamAB = []
    for (let i = 0 ; i < conn.war[m.chat].length ; i++){
      if (i < 5){
        if (conn.war[m.chat][i].user != "") teamA.push(conn.war[m.chat][i].user)
      }else {
        if (conn.war[m.chat][i].user != "") teamB.push(conn.war[m.chat][i].user)
      }
      teamAB.push(conn.war[m.chat][i].user)
    }

    conn.reply(m.chat, `${conn.war2[m.chat].war ? '*doblar : ' + '@' + conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0] + '*\n*Apuesta : Rp. ' + Number(conn.war2[m.chat].dolares).toLocaleString() + '*\n\n' : '*Taruhan : Rp. ' + Number(conn.war2[m.chat].dolares).toLocaleString() + '*\n\n' }*EQUIPO A :*\n` + teamA.map((v, i )=> `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (Lv.${conn.war[m.chat][i].lvl} HP: ${conn.war[m.chat][i].hp})`).join`\n` + "\n\n*EQUIPO B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i+5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (Lv.${conn.war[m.chat][i+5].lvl} HP: ${conn.war[m.chat][i+5].hp})`).join`\n`,m, {contextInfo: {
      mentionedJid: teamAB
    }})
  }

  // EMPEZAR JUEGO
  if (args[0] == "start"){
    if (conn.war2[m.chat].war) return m.reply(`*La guerra ha comenzado, no puedes unirte..*`)
    teamA = 0
    teamB = 0
    for (let i=0;i<10;i++){
      if(i<5){
        if (conn.war[m.chat][i].user != "") teamA += 1
      }else{
        if (conn.war[m.chat][i].user != "") teamB += 1
      }
    }

    if (teamA == teamB && teamA > 0){
      conn.war2[m.chat].war = true
      for (let i=0;i<5;i++){
        if (conn.war[m.chat][i].user != ""){
          let user = conn.war[m.chat][i].user
          return conn.reply(m.chat,`*El juego comenzó exitosamente.*\n*Por favor @${user.split('@')[0]} atacar al enemigo*\n\n.war player = estadísticas del jugador\n.attack @tag = ataca a tu oponente`, m, {contextInfo: { mentionedJid: [user] }})
        }
      }
    }else {
      if (teamA > teamB){
        m.reply(`*El equipo B es menos ${teamA-teamB} más personas para hacer que el juego sea justo.*`)
      }else {
        m.reply(`*El equipo A es menos ${teamB-teamA} más personas para hacer que el juego sea justo.*`)
      }
    }
  } else {
  throw 'KasumaBot-Md'
  }

}
handler.help = ['war']
handler.tags = ['game']
handler.command = /^(war)$/i
handler.group = true
export default handler*/