let handler = async (m, { conn, usedPrefix, args, command }) => {
  conn.war = conn.war || {};
  conn.war2 = conn.war2 || {};

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function cekAFK(x) {
    let { turn, time } = x;
    await sleep(90000);
    let { turn: turnNow, time: timeNow } = conn.war2[m.chat];

    if (turn == turnNow && time == timeNow) {
      conn.war[m.chat][turn].hp -= 2500;
      conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split('@')[0]} actualmente AFK (comercio -2500 HP)*\n\n.jugador de guerra = Estadísticas jugador\n.ataque @tag = ataca a tu oponente`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][turn].user] } });
      await sleep(3000);

      if (conn.war[m.chat][turn].hp <= 0) {
        conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split('@')[0]} ya muerto por culpa de HP (Punto de Salud) finalizado.*`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][turn].user] } });
        let playerTotal = 0;
        let playerKalah = 0;

        for (let i = 0; i < 10; i++) {
          if (conn.war[m.chat][i].user !== "") {
            playerTotal += 1;
            if (conn.war[m.chat][i].hp <= 0) playerKalah += 1;
          }
        }

        if (playerTotal > 0 && playerTotal === playerKalah) {
          handleWinner(playerTotal, playerKalah);
        }
      }

      let pergantian = handleTurnChange(turn);
      if (!pergantian) handleTurnChange();
      await sleep(3000);
      conn.reply(m.chat, `*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.jugador de guerra = estadísticas del jugador\n.ataque @tag = ataca a tu oponente`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user] } });
      cekAFK(conn.war2[m.chat]);
    }
  }

  function handleTurnChange(turn) {
    let pergantian = false;
    let start = turn < 5 ? 5 : 0;
    let end = turn < 5 ? 10 : 5;

    for (let i = start; i < end; i++) {
      if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user !== "" && !conn.war[m.chat][i].turn) {
        conn.war2[m.chat].turn = i;
        conn.war2[m.chat].time += 1;
        pergantian = true;
      }
    }

    if (!pergantian) {
      for (let l = 9; l >= 0; l--) {
        if (conn.war[m.chat][l].user !== "" && conn.war[m.chat][l].hp > 0) {
          conn.war2[m.chat].turn = l;
          conn.war2[m.chat].time += 1;
        }
        conn.war[m.chat][l].turn = false;
      }
    }

    return pergantian;
  }

  function handleWinner(playerTotal, playerKalah) {
    let teamA = [];
    let teamB = [];
    let teamAB = [];
    let dolares = conn.war2[m.chat].dolares;

    for (let j = 0; j < 5; j++) {
      if (conn.war[m.chat][j].user !== "") {
        global.db.data.users[conn.war[m.chat][j].user].dolares -= Number(dolares);
        teamA.push(conn.war[m.chat][j].user);
        teamAB.push(conn.war[m.chat][j].user);
      }
    }

    for (let j = 5; j < 10; j++) {
      if (conn.war[m.chat][j].user !== "") {
        global.db.data.users[conn.war[m.chat][j].user].dolares += Number(dolares);
        teamB.push(conn.war[m.chat][j].user);
        teamAB.push(conn.war[m.chat][j].user);
      }
    }

    let winnerTeam = playerTotal === playerKalah ? "B" : "A";
    let loserTeam = winnerTeam === "A" ? "B" : "A";

    conn.reply(m.chat, `*EL EQUIPO ${winnerTeam} GANÓ PORQUE EL EQUIPO ${loserTeam} FUE TODO TONTO*\n\n*EQUIPO ${winnerTeam} :*\n` + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (${winnerTeam === "A" ? '+' : '-'} Rp. ${Number(dolares).toLocaleString()})`).join`\n` + `\n\n*EQUIPO ${loserTeam} :*\n` + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? '❤️ ' : '☠️ ' }@${v.split('@')[0]} (${winnerTeam === "A" ? '-' : '+'} Rp. ${Number(dolares).toLocaleString()})`).join`\n`, m, { contextInfo: { mentionedJid: teamAB } });
    delete conn.war[m.chat];
    delete conn.war2[m.chat];
  }

  function handleAttack(attacker, target, pointAttacker, pointTarget) {
    for (let i = 0; i < 10; i++) {
      if (conn.war[m.chat][i].user === target) {
        conn.war[m.chat][i].hp -= pointAttacker * 500;
        conn.war[m.chat][conn.war2[m.chat].turn].turn = true;
        conn.reply(m.chat, `*@${attacker.split('@')[0]} ataque @${target.split('@')[0]} hasta que su vida se reduce ${pointAttacker * 500} (sobrante HP: ${conn.war[m.chat][i].hp})*\n\n*@${attacker.split('@')[0]} [${pointAttacker * 10}%] - [${pointTarget * 10}%] @${target.split('@')[0]}*\n*El nivel influye mucho en el éxito.*`, m, { contextInfo: { mentionedJid: [attacker, target] } });
        return true;
      }
    }
    return false;
  }

  if (!(m.chat in conn.war)) return m.reply(`*No hay juegos en este grupo..*`);
  if (!conn.war2[m.chat]?.war) return m.reply(`*La guerra aún no ha comenzado, con ".war start" comienza la pelea.*`);

  for (let i = 0; i < 10; i++) {
    if (m.sender == conn.war[m.chat][i].user && i !== conn.war2[m.chat].turn) {
      conn.reply(m.chat, `*ahora es el turno @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar.*`, m, { contextInfo: { mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user] } });
      cekAFK(conn.war2[m.chat]);
    }
  }

  if (!args[0]) return m.reply(`*Etiqueta al enemigo para ser atacado.*\n*Tipo .war player*`);
  args[0] = args[0].split('@')[1] + "@s.whatsapp.net";
  let success = false;

  let start = conn.war2[m.chat].turn < 5 ? 5 : 0;
  let end = conn.war2[m.chat].turn < 5 ? 10 : 5;

  for (let i = start; i < end; i++) {
    if (conn.war[m.chat][i].user === args[0] && conn.war[m.chat][i].hp > 0) {
      let attacker = m.sender;
      let target = args[0];

      let opportunity = Array(global.db.data.users[attacker].level).fill(attacker).concat(Array(global.db.data.users[target].level).fill(target));

      let pointAttacker = 0;
      let pointTarget = 0;
      for (let i = 0; i < 10; i++) {
        if (opportunity[getRandom(0, opportunity.length)] === attacker) pointAttacker += 1;
        else pointTarget += 1;
      }

      success = handleAttack(attacker, target, pointAttacker, pointTarget);

      if (success) {
        for (let i = 0; i < 10; i++) {
          if (m.sender == conn.war[m.chat][i].user) {
            conn.war[m.chat][i].turn = true;
          }
        }
      }

      break;
    }
  }

  if (!success) {
    return m.reply(`*Ingrese la lista correcta de jugadores del juego, jefe..*\n\n*Ejemplo ".war player"*`);
  }

  if (conn.war2[m.chat].turn < 5) {
    handleTurnAndCheckWinner(5, 10);
  } else {
    handleTurnAndCheckWinner(0, 5);
  }

  function handleTurnAndCheckWinner(start, end) {
    let userAktif = 0;
    let userMati = 0;

    for (let i = start; i < end; i++) {
      if (conn.war[m.chat][i].user !== "") {
        userAktif += 1;
        if (conn.war[m.chat][i].hp <= 0) {
          userMati += 1;
        }
      }
    }

    if (userAktif === userMati) {
      handleWinner(userAktif, userMati);
    }

    let turn1 = conn.war2[m.chat].turn;
    let turn2 = conn.war2[m.chat].turn;
    for (let k = start; k < end; k++) {
      if (conn.war[m.chat][k].hp > 0 && conn.war[m.chat][k].user !== "" && !conn.war[m.chat][k].turn) {
        conn.war2[m.chat].turn = k;
        conn.war2[m.chat].time += 1;
        turn2 = conn.war2[m.chat].turn;
      }
    }

    if (turn1 === turn2) {
      for (let i = 0; i < 10; i++) {
        conn.war[m.chat][i].turn = false;
      }
      for (let i = start; i < end; i++) {
        if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user !== "" && !conn.war[m.chat][i].turn) {
          conn.war2[m.chat].turn = i;
          conn.war2[m.chat].time += 1;
        }
      }
    }

    sleep(2000);
    conn.reply(m.chat, `*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.war player = estadísticas del jugador\n.ataque @tag = ataca a tu oponente`, m, { contextInfo: { mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user] } });
    cekAFK(conn.war2[m.chat]);
  }

  let totalUser = 0;
  let totalTurn = 0;
  for (let i = 0; i < 10; i++) {
    if (conn.war[m.chat][i].user !== "") totalUser += 1;
    if (conn.war[m.chat][i].turn) totalTurn += 1;
  }
  if (totalTurn === totalUser) {
    for (let i = 0; i < 10; i++) {
      conn.war[m.chat][i].turn = false;
    }
  }
};

handler.help = ['attack', 'atk'];
handler.tags = ['game'];
handler.command = /^(attack|atk)$/i;
handler.group = true;
export default handler;

function getRandom(min,max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max-min+1)) + min
}