let handler = async (m, { conn, usedPrefix, args, command }) => {
  conn.war = conn.war || {};
  conn.war2 = conn.war2 || {};

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function cekAFK(x) {
    let turn = x;
    let time = conn.war2[m.chat].time;
    await sleep(90000);
    let turnNow = conn.war2[m.chat].turn;
    let timeNow = conn.war2[m.chat].time;

    if (turn == turnNow && time == timeNow) {
      conn.war[m.chat][turn].hp -= 2500;
      conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split('@')[0]} actualmente AFK (comercio -2500 HP)*\n\n.jugador de guerra = Estadísticas jugador\n.ataque @tag = ataca a tu oponente`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][turn].user] } });
      await sleep(3000);

      if (conn.war[m.chat][turn].hp <= 0) {
        conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split('@')[0]} ya muerto por culpa de HP (Punto de Salud) finalizado.*`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][turn].user] } });

        let playerTotal = 0;
        let playerKalah = 0;
        const teamStartIndex = turn < 5 ? 0 : 5;

        for (let i = teamStartIndex; i < teamStartIndex + 5; i++) {
          if (conn.war[m.chat][i].user !== "") {
            playerTotal += 1;
            if (conn.war[m.chat][i].hp <= 0) playerKalah += 1;
          }
        }

        if (playerTotal > 0 && playerTotal === playerKalah) {
          const winningTeam = teamStartIndex === 0 ? 1 : 0;
          const losingTeam = teamStartIndex;
          const teamA = teamStats(winningTeam, conn.war2[m.chat].dolares);
          const teamB = teamStats(losingTeam, conn.war2[m.chat].dolares);
          conn.reply(m.chat, endGameMessage(winningTeam, losingTeam, conn.war2[m.chat].dolares, teamA, teamB), m, { contextInfo: { mentionedJid: teamA.concat(teamB) } });
          delete conn.war[m.chat];
          delete conn.war2[m.chat];
        }
      }

      let pergantian = false;
      const teamStartIndex = turn < 5 ? 5 : 0;

      for (let i = teamStartIndex; i < teamStartIndex + 5; i++) {
        if (conn.war[m.chat][i].hp > 0 && conn.war[m.chat][i].user !== "" && conn.war[m.chat][i].turn === false) {
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

      await sleep(3000);
      conn.reply(m.chat, `*doblar @${conn.war[m.chat][conn.war2[m.chat].turn].user.split('@')[0]} atacar (Tiempo 90 segundos)*\n\n.jugador de guerra = estadísticas del jugador\n.ataque @tag = ataca a tu oponente`, null, { contextInfo: { mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user] } });
      cekAFK(conn.war2[m.chat].turn);
    }
  }

  function setDefaults() {
    conn.war[m.chat] = conn.war[m.chat] || Array.from({ length: 10 }, () => ({ user: '', hp: 0, turn: false }));
    conn.war2[m.chat] = conn.war2[m.chat] || { war: false, turn: 0, time: 0, dolares: 0 };
  }

  function teamStats(team, dolares) {
    let teamStats = [];
    for (let i = 0; i < 5; i++) {
      const player = conn.war[m.chat][i + team * 5];
      if (player.user !== "") {
        const change = team === 0 ? dolares : -dolares;
        global.db.data.users[player.user].dolares += change;
        teamStats.push(player.user);
      }
    }
    return teamStats;
  }

  function endGameMessage(winningTeam, losingTeam, dolares, teamA, teamB) {
    const message = `*EL EQUIPO ${winningTeam === 0 ? 'A' : 'B'} GANÓ PORQUE EL EQUIPO ${losingTeam === 0 ? 'B' : 'A'} FUE TODO TONTO*\n\n`;
    return message + `*EQUIPO ${winningTeam === 0 ? 'A' : 'B'} :*\n` + teamA.map(v => `❤️ @${v.split('@')[0]}`).join("\n") + `\n\n*EQUIPO ${losingTeam === 0 ? 'B' : 'A'} :*\n` + teamB.map(v => `☠️ @${v.split('@')[0]}`).join("\n");
  }

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setDefaults() {
    conn.war[m.chat] = conn.war[m.chat] || Array.from({ length: 10 }, (_, i) => ({ user: '', hp: 0, turn: false }));
    conn.war2[m.chat] = conn.war2[m.chat] || { war: false, turn: 0, time: 0, dolares: 0 };
  }
}

handler.help = ['attack', 'atk'];
handler.tags = ['game'];
handler.command = /^(attack|atk)$/i;
handler.group = true;

export default handler;
