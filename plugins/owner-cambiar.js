
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (command == 'cambiarbiografia') {
         if (!text) throw `ingrese un texto`
           try {
              await conn.updateProfileStatus(text).catch(_ => _)
              conn.reply(m.chat, `cambiada con exito`, m)
      } catch {
             throw 'error'
           }
    }

    if (command == 'cambiarmensaje') {
        if (!m.quoted) throw 'Responde a el mensaje a editar';
        if (!text) throw 'Ingrese un texto';
        if (!m.quoted.isBaileys) throw 'El mensaje no es de el bot';
      
        try {
          await conn.sendMessage(m.chat, {
            text: text,
            edit: m.quoted.vM.key,
          });
        } catch (e) {
          try {
            const edit = m.quoted.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant;
            const bang = m.quoted.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id;
            await conn.sendMessage(m.chat, {
              text: text,
              edit: {
                remoteJid: m.chat,
                fromMe: false,
                id: bang,
                participant: edit,
              },
            });
          } catch (e) {
            try {
              await conn.relayMessage(m.chat, {
                protocolMessage: {
                  key: m.quoted.vM.key,
                  type: 14,
                  editedMessage: {
                    conversation: text,
                  },
                },
              }, {});
            } catch (e) {
              await m.reply(eror);
            }
          }
        }
    }

    if (command == 'cambiarnombre') {
        if (!text) throw `ingrese un texto`
        try {
          await conn.updateProfileName(text)
          m.reply('aplicado correctamente')
        } catch (e) {
          console.log(e)
          throw `Error`
        }
    }
  
  }
      
  handler.help = handler.command = ['cambiarbiografia', 'cambiarmensaje', 'cambiarnombre']
  handler.tags = ['owner']
  
  handler.owner = true
  
  export default handler