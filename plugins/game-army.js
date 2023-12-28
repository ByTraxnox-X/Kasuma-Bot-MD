let handler = async (m, { conn }) => {
    const userId = m.sender;
    const input = m.text.trim().toLowerCase();
  
    if (input === 'iniciarguerra') {
      if (!conn.war || !conn.war2) {
        conn.war2 = {"war": false, "turn": 0, "time": 0, "dolares": 0};
        conn.war = [];
        let exp = global.db.data.users[m.sender].exp;
        conn.war[0] = {"user": m.sender, "hp": 4000, "lvl": global.db.data.users[m.sender].level, "turn": false};
        for (let i = 1; i < 10; i++) {
          conn.war[i] = {"user": "", "hp": 0, "lvl": 0, "turn": false};
        }
        return conn.reply(m.chat, `*Ingresaste exitosamente al juego como Equipo A.*\n\n*.guerra join a/b* = unirte al juego\n*.guerra start* = empezar el juego`, m);
      } else {
        if (conn.war2.war) {
          return conn.reply(m.chat, `*El juego ha comenzado, no puedes unirte.*`, m);
        }
  
        for (let i = 0; i < conn.war.length; i++) {
          if (m.sender == conn.war[i].user) {
            let total = 0;
            for (let j = 0; j < 10; j++) {
              if (conn.war[j].user == "") {
                total += 1;
              }
            }
            return conn.reply(m.chat, `*Has entrado al juego*\n\n*.guerra join a/b* = unirte al juego\n*.guerra start* = empezar el juego`, m);
          }
        }
  
        if (input.split(' ')[2]) {
          if (input.split(' ')[2].toLowerCase() == "a") {
            if (conn.war2.dolares == 0) {
              return conn.reply(m.chat, `*@${conn.war[0].user.split('@')[0]} Tiene que establecer el botin inicial de la guerra (Mínimo RP. 100)*\n\n.guerra dolares 100`, m, { contextInfo: { mentionedJid: [conn.war[0].user] } });
            }
            if (global.db.data.users[m.sender].dolares < conn.war2.dolares) {
              return conn.reply(m.chat, `*Tu dinero debe ser al menos RP. ${conn.war2.dolares.toLocaleString()} para unirte a este juego.*`, m);
            }
            for (let i = 1; i < 5; i++) {
              if (conn.war[i].user == "") {
                let exp = global.db.data.users[m.sender].exp;
                conn.war[i] = {"user": m.sender, "hp": 4000, "lvl": global.db.data.users[m.sender].level, "turn": false};
                let total = 0;
                for (let j = 0; j < 10; j++) {
                  if (conn.war[j].user == "") {
                    total += 1;
                  }
                }
                return conn.reply(m.chat, `*Ingresaste exitosamente al juego como Equipo A*\n\n*.guerra join a/b* = unirte al juego\n*.guerra start* = empezar el juego`, m);
              }
            }
          } else if (input.split(' ')[2].toLowerCase() == "b") {
            if (conn.war2.dolares == 0) {
              return conn.reply(m.chat, `*Ayuda @${conn.war[0].user.split('@')[0]} Tiene que establecer el botin inicial de la guerra (Mínimo RP. 100)*\n\n.guerra dolares 100`, m, { contextInfo: { mentionedJid: [conn.war[0].user] } });
            }
            if (global.db.data.users[m.sender].dolares < conn.war2.dolares) {
              return conn.reply(m.chat, `*Tu dinero debe ser al menos RP. ${conn.war2.dolares.toLocaleString()} para unirte a este juego.*`, m);
            }
            for (let i = 5; i < 10; i++) {
              if (conn.war[i].user == "") {
                let exp = global.db.data.users[m.sender].exp;
                conn.war[i] = {"user": m.sender, "hp": 4000, "lvl": global.db.data.users[m.sender].level, "turn": false};
                let total = 0;
                for (let j = 0; j < 10; j++) {
                  if (conn.war[j].user == "") {
                    total += 1;
                  }
                }
                return conn.reply(m.chat, `*Ingresaste exitosamente al juego como Equipo B*\n\n*.guerra join a/b* = unirte al juego\n*.guerra start* = empezar el juego`, m);
              }
            }
          } else {
            return conn.reply(m.chat, `*Elige el equipo A o B*\n\n.guerra join a\n.guerra join b`, m);
          }
        } else {
          return conn.reply(m.chat, `*Elige el equipo A o B*\n\n.guerra join a\n.guerra join b`, m);
        }
  
        for (let i = 0; i < conn.war.length; i++) {
          let total = 0;
          if (conn.war[i].user != "") {
            total += 1;
          }
          if (total == 10) conn.war2.war = true;
        }
      }
    }
  
    if (input === 'guerra join a') {
      let args = input.split(' ');
      if (args[2] && args[2].toLowerCase() === 'a') {
        return conn.reply(m.chat, `*Ya estás en el Equipo A.*`, m);
      } else if (args[2] && args[2].toLowerCase() === 'b') {
        return conn.reply(m.chat, `*Has cambiado al Equipo A.*`, m);
      }
    }
  };
  
  handler.help = ['guerra'];
  handler.tags = ['game'];
  handler.command = /^(guerra)$/i;
  handler.group = true;
  
  export default handler;
  