
let handler = async(m, { conn, args, text, command }) => {
  
    if (command == 'hornycard') {
        const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/horny', {
          avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        }), 'hornycard.png', 'Tremendo calenturiento!', m);
    }

    if (command == 'itssostupid') {   
        const text = args.slice(1).join(' ');
        const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/its-so-stupid', {
          avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
          dog: text || 'debes de pertenecer a la religion *ESTUPIDA*',
        }), 'error.png', `*@${author}*`, m);
    }

    if (command == 'namecard') {  
        if (!text) throw `ingrese el cumpleaños`
        conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/namecard', {
          birthday: text,
          username: conn.getName(m.sender),
          avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        }), 'error.png', 'tu tarjeta esta lista!', m);
    }

    if (command == 'simpcard') {  
        const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/simpcard', {
          avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        }), 'error.png', 'vaya, eres un SIMPatico', m);
    }
  
  }
      
  handler.help = handler.command = ['hornycard', 'itssostupid', 'namecard', 'simpcard']
  handler.tags = ['img']
  export default handler
  