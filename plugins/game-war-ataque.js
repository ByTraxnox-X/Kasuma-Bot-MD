let handler = async (m, { conn, usedPrefix, args, command }) => {
  conn.war = conn.war ? conn.war : {}
  conn.war2 = conn.war2 ? conn.war2 : {}
  // fungsi delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // fungsi turn kalau ada yg afk
  async function cekAFK(x){
    let turn = x
    let time = conn.war2[m.chat].time
    await sleep(90000)
    let turnNow = conn.war2[m.chat].turn
    let timeNow = conn.war2[m.chat].time
    // m.reply("Turn : " + turn + "-" + turnNow + "\n\nTime : " + time + "-" + timeNow)
    if (turn == turnNow && time == timeNow){
      conn.war[m.chat][turn].hp -= 2500
      conn.reply(m.chat,`*@${conn.war[m.chat][turn].user.split('@')[0]} actualmente AFK (Bien -2500 HP)*\n\n.war player = estadísticas del jugador\n.attack @tag = ataca a tu oponente`,null,{contextInfo : {mentionedJid : [conn.war[m.chat][turn].user]}})
      await sleep(3000)
      // cek kalau mati
      if (conn.war[m.chat][turn].hp <= 0) {
        conn.reply(m.chat,`*@${conn.war[m.chat][turn].user.split('@')[0]} está muerto porque los HP (puntos de salud) están agotados.*`,null,{contextInfo : {mentionedJid : [conn.war[m.chat][turn].user]}})
        // cek tim nya
        let playerTotal = 0
        let playerKalah = 0
        if (turn < 5){
          for (let i=0;i<5;i++){
            if (conn.war[m.chat][i].user != ""){
              playerTotal += 1
              if (conn.war[m.chat][i].hp <= 0)
              playerKalah += 1
            }
          }
          // m.reply(playerTotal + "T-K" + playerKalah)
          if (playerTotal > 0 && playerTotal == playerKalah){
            var teamA = []
            var teamB = []
            var teamAB = []
            for (let j=0;j<5;j++){
              if (conn.war[m.chat][j].user != ""){
                global.db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money)
                teamA.push(conn.war[m.chat][j].user)
                teamAB.push(conn.war[m.chat][j].user)
              }
            }
            for (let j=5;j<10;j++){
              if (conn.war[m.chat][j].user != ""){
                global.db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money)
                teamB.push(conn.war[m.chat][j].user)
                teamAB.push(conn.war[m.chat][j].user)
              }
            }
            conn.reply(m.chat, `*EL EQUIPO B GANÓ PORQUE EL EQUIPO A FUE TODO TONTO*\n\n*EQUIPO A :*\n` + teamA.map((v, i )=> `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*EQUIPO B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i+5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`,m, {contextInfo: {
              mentionedJid: teamAB
            }})
            delete conn.war[m.chat]
            delete conn.war2[m.chat]
          }
        }else {
          for (let i=5;i<10;i++){
            if (conn.war[m.chat][i].user != ""){
              playerTotal += 1
              if (conn.war[m.chat][i].hp <= 0)
              playerKalah += 1
            }
          }
          m.reply(playerTotal + "T-K" + playerKalah)
          if (playerTotal == playerKalah){
            var teamA = []
            var teamB = []
            var teamAB = []
            for (let j=0;j<5;j++){
              if (conn.war[m.chat][j].user != ""){
                global.db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money)
                teamA.push(conn.war[m.chat][j].user)
                teamAB.push(conn.war[m.chat][j].user)
              }
            }
            for (let j=5;j<10;j++){
              if (conn.war[m.chat][j].user != ""){
                global.db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money)
                teamB.push(conn.war[m.chat][j].user)
                teamAB.push(conn.war[m.chat][j].user)
              }
            }
            conn.reply(m.chat, `*EL EQUIPO A GANÓ PORQUE EL EQUIPO B FUE TODO TONTO*\n\n*EQUIPO A :*\n` + teamA.map((v, i )=> `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*EQUIPO B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i+5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`,m, {contextInfo: {
              mentionedJid: teamAB
            }})
            delete conn.war[m.chat]
            delete conn.war2[m.chat]
          }
        }
      }
      let pergantian = false
      if (turn < 5){
        for (let i=5;i<10;i++){
          if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user != "" && conn.war[m.chat][i].turn == false){
            conn.war2[m.chat].turn = i
            conn.war2[m.chat].time = +1
            pergantian = true
          }
        }
      }else {
        for (let i=0;i<5;i++){
          if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user != "" && conn.war[m.chat][i].turn == false){
            conn.war2[m.chat].turn = i
            conn.war2[m.chat].time = +1
            pergantian = true
          }
        }
      }
      if (pergantian == false){
        for (let l=9;l>=0;l--){
          if (conn.war[m.chat][l].user != "" && conn.war[m.chat][l].hp > 0) {
            conn.war2[m.chat].turn = l
            conn.war2[m.chat].time = +1
          }
          conn.war[m.chat][l].turn == false
        }
      }
      await sleep(3000)
      conn.reply(m.chat,`*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.war player = estadísticas del jugador\n.attack @tag = ataca a tu oponente`,null,{contextInfo : {mentionedJid : [conn.war[m.chat][conn.war2[m.chat].turn].user]}})
      cekAFK(conn.war2[m.chat].turn)
    }
  }

  if (!(m.chat in conn.war)) return m.reply(`*No hay juegos en este grupo..*`)
  if (!conn.war2[m.chat].war) return m.reply(`*La guerra aún no ha comenzado, cuando ".war start" comienza la pelea..*`)
  for (let i=0;i<10;i++){
    if (m.sender == conn.war[m.chat][i].user){
      if (i != conn.war2[m.chat].turn) {
        conn.reply(m.chat,`*ahora es el turno @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar.*`,m, {contextInfo : { mentionedJid : [conn.war[m.chat][conn.war2[m.chat].turn].user]}})
        cekAFK(conn.war2[m.chat].turn)
      }
    }
  }
  if (!args[0]) return m.reply(`*Etiqueta al enemigo para ser atacado.*\n*Tipo .war player*`)
  args[0] = args[0].split('@')[1]
  args[0] += "@s.whatsapp.net"
  let success = false

  if (conn.war2[m.chat].turn < 5){
    // return m.reply(args[0])
    for (let i=5;i<10;i++){
      if (conn.war[m.chat][i].user == args[0] && conn.war[m.chat][i].hp > 0){
        let attacker = m.sender
       let  target = args[0]

        let opportunity = []
        for (let i=0;i<global.db.data.users[attacker].level;i++){
          opportunity.push(attacker)
        }
        for (let i=0;i<global.db.data.users[target].level;i++){
          opportunity.push(target)
        }

        let pointAttacker = 0
        let pointTarget = 0
        for (let i=0;i<10;i++){
          if (opportunity[getRandom(0,opportunity.length)] == attacker) pointAttacker += 1
          else pointTarget += 1
        }

        for (let i=0;i<10;i++){
          if (conn.war[m.chat][i].user == target){
            conn.war[m.chat][i].hp -= pointAttacker * 500
            conn.war[m.chat][conn.war2[m.chat].turn].turn = true
            conn.reply(m.chat,`*@${attacker.split('@')[0]} ataque @${target.split('@')[0]} hasta que su vida se reduce ${pointAttacker * 500} (sobrante HP: ${conn.war[m.chat][i].hp})*\n\n*@${attacker.split('@')[0]} [${pointAttacker*10}%] - [${pointTarget*10}%] @${target.split('@')[0]}*\n*El nivel influye mucho en el éxito.*`,m,{contextInfo : {mentionedJid : [attacker, target]}})
            await sleep(2000)
            if (conn.war[m.chat][i].hp <= 0) conn.reply(m.chat,`*@${target.split(`@`)[0]} ya murio en batalla.*`,m, {contextInfo : {mentionedJid : [target]}})
            success = true
          }
        }
      }
    }
    if (success == false) {
      return m.reply(`*Ingrese la lista correcta de jugadores del juego, jefe.*\n\n*Controlar ".war player"*`)
    }else {
      for (let i=0;i<10;i++){
        if (m.sender == conn.war[m.chat][i].user){
          conn.war[m.chat][i].turn = true
        }
      }
    }
  }else {
    for (let i=0;i<5;i++){
      if (conn.war[m.chat][i].user == args[0] && conn.war[m.chat][i].hp > 0){
        let attacker = m.sender
        let target = args[0]

        let opportunity = []
        for (let i=0;i<global.db.data.users[attacker].level;i++){
          opportunity.push(attacker)
        }
        for (let i=0;i<global.db.data.users[target].level;i++){
          opportunity.push(target)
        }

        let pointAttacker = 0
        let pointTarget = 0
        for (i=0;i<10;i++){
          if (opportunity[getRandom(0,opportunity.length)] == attacker) pointAttacker += 1
          else pointTarget += 1
        }

        for (let i=0;i<10;i++){
          if (conn.war[m.chat][i].user == target){
            conn.war[m.chat][i].hp -= pointAttacker * 500
            conn.reply(m.chat,conn.war[m.chat][conn.war2[m.chat].turn].turn,m)
            conn.war[m.chat][conn.war2[m.chat].turn].turn = true
            conn.reply(m.chat,conn.war[m.chat][conn.war2[m.chat].turn].turn,m)
            conn.reply(m.chat,`*@${attacker.split('@')[0]} ataque @${target.split('@')[0]} hasta que su vida se reduce ${pointAttacker * 500} (sobrante HP: ${conn.war[m.chat][i].hp})*\n\n*@${attacker.split('@')[0]} [${pointAttacker*10}%] - [${pointTarget*10}%] @${target.split('@')[0]}*\n*El nivel influye mucho en el éxito.*`,m,{contextInfo : {mentionedJid : [attacker, target]}})
            await sleep(2000)
            if (conn.war[m.chat][i].hp <= 0) conn.reply(m.chat,`*@${target.split(`@`)[0]} ya murio en batalla.*`,m, {contextInfo : {mentionedJid : [target]}})
            success = true
          }
        }
      }
    }
    if (success == false) {
      return m.reply(`*Ingrese la lista correcta de jugadores del juego, jefe.*\n\n*Controlar ".war player"*`)
    }else {
      for (let i=0;i<10;i++){
        if (m.sender == conn.war[m.chat][i].user){
          conn.war[m.chat][i].turn = true
        }
      }
    }
  }

  if (conn.war2[m.chat].turn < 5){
    let userAktif = 0
    let userMati = 0
    for (let i=5;i<10;i++){
      if (conn.war[m.chat][i].user != ""){
        userAktif += 1
        if (conn.war[m.chat][i].hp <= 0){
          userMati += 1
        }
      }
    }
    // m.reply(userAktif + "/" + userMati)
    if(userAktif == userMati){
      var teamA = []
      var teamB = []
      var teamAB = []
      for (let j=0;j<5;j++){
        if (conn.war[m.chat][j].user != ""){
          global.db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money)
          teamA.push(conn.war[m.chat][j].user)
          teamAB.push(conn.war[m.chat][j].user)
        }
      }
      for (let j=5;j<10;j++){
        if (conn.war[m.chat][j].user != ""){
          global.db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money)
          teamB.push(conn.war[m.chat][j].user)
          teamAB.push(conn.war[m.chat][j].user)
        }
      }
      conn.reply(m.chat, `*EL EQUIPO A GANÓ PORQUE EL EQUIPO B FUE TODO TONTO*\n\n*EQUIPO A :*\n` + teamA.map((v, i )=> `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*EQUIPO B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i+5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`,m, {contextInfo: {
        mentionedJid: teamAB
      }})
      delete conn.war[m.chat]
      delete conn.war2[m.chat]
    }
    let turn1 = conn.war2[m.chat].turn
    let turn2 = conn.war2[m.chat].turn
    for (let k=5;k<10;k++){
      if (conn.war[m.chat][k].hp > 0 && conn.war[m.chat][k].user != "" && conn.war[m.chat][k].turn == false) {
        conn.war2[m.chat].turn = k
        conn.war2[m.chat].time = +1
        turn2 = conn.war2[m.chat].turn
      }
    }
    if (turn1 == turn2){
      for (i=0;i<10;i++){
        conn.war[m.chat][i].turn = false
      }
      for(i=0;i<5;i++){
        if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user != "" && conn.war[m.chat][i].turn == false) {
          conn.war2[m.chat].turn = i
          conn.war2[m.chat].time = +1
        }
      }
    }
    await sleep(2000)
    conn.reply(m.chat,`*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.war player = estadísticas del jugador\n.attack @tag = ataca a tu oponente`,m, {contextInfo : {mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]}})
    cekAFK(conn.war2[m.chat].turn)
  }else {
    let userAktif = 0
    let userMati = 0
    for (let i=0;i<5;i++){
      if (conn.war[m.chat][i].user != ""){
        userAktif += 1
        if (conn.war[m.chat][i].hp <= 0){
          userMati += 1
        }
      }
    }
    if(userAktif == userMati){
      var teamA = []
      var teamB = []
      var teamAB = []
      for (let j=0;j<5;j++){
        if (conn.war[m.chat][j].user != ""){
          global.db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money)
          teamA.push(conn.war[m.chat][j].user)
          teamAB.push(conn.war[m.chat][j].user)
        }
      }
      for (let j=5;j<10;j++){
        if (conn.war[m.chat][j].user != ""){
          global.db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money)
          teamB.push(conn.war[m.chat][j].user)
          teamAB.push(conn.war[m.chat][j].user)
        }
      }
      conn.reply(m.chat, `*EL EQUIPO B GANÓ PORQUE EL EQUIPO A FUE TODO TONTO*\n\n*EQUIPO A :*\n` + teamA.map((v, i )=> `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*EQUIPO B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i+5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`,m, {contextInfo: {
        mentionedJid: teamAB
      }})
      delete conn.war[m.chat]
      delete conn.war2[m.chat]
    }
    let turn1 = conn.war2[m.chat].turn
    let turn2 = conn.war2[m.chat].turn
    for (let k=0;k<5;k++){
      if (conn.war[m.chat][k].hp > 0 && conn.war[m.chat][k].user != "" && conn.war[m.chat][k].turn == false) {
        conn.war2[m.chat].turn = k
        conn.war2[m.chat].time = +1
        turn2 = conn.war2[m.chat].turn
      }
    }
    if (turn1 == turn2){
      for (let i=0;i<10;i++){
        conn.war[m.chat][i].turn = false
      }
      for(let i=0;i<5;i++){
        if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user != "" && conn.war[m.chat][i].turn == false) {
          conn.war2[m.chat].turn = i
          conn.war2[m.chat].time = +1
        }
      }
    }
    await sleep(2000)
    conn.reply(m.chat,`*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.war player = estadísticas del jugador\n.attack @tag = ataca a tu oponente`,m, {contextInfo : {mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]}})
    cekAFK(conn.war2[m.chat].turn)
  }

  let totalUser = 0
  let totalTurn = 0
  for (let i=0;i<10;i++){
    if (conn.war[m.chat][i].user != "") totalUser += 1
    if (conn.war[m.chat][i].turn == true) totalTurn += 1
  }
  if (totalTurn == totalUser) {
    for (i=0;i<10;i++){
      conn.war[m.chat][i].turn = false
    }
  }

}
handler.help = ['attack','atk']
handler.tags = ['game']
handler.command = /^(attack|atk)$/i
handler.group = true
export default handler

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}