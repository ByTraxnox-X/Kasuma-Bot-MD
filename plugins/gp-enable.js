// Código para activar/desactivar funciones
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {

  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break;

    case 'detect':
    case 'detector':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break;

    case 'document':
    case 'documento':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.useDocument = isEnable
      break;

    case 'public':
    case 'publico':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break;

    case 'antilink':
    case 'antilinkwa':
    case 'antilinkwha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break;

    case 'antidelete':
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break;

    case 'antilink2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink2 = isEnable;
      break;

    case 'sololatinos':
    case 'sololatino':
    case 'onlylatinos':
    case 'onlylat':
    case 'onlylatan':
    case 'sololatan':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.onlyLatinos = isEnable
      break;

    case 'nsfw':
    case '+18':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break;

    case 'modoadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.modoadmin = isEnable
      break;

    case 'antiprivado':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.antiPrivate = isEnable
      break;

    case 'antitoxic':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiToxic = isEnable;
      break;

    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break;

    case 'simsimi':
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.simi = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break;

      case 'onlypv':
        case 'onlydm':
        case 'onlymd':
        case 'solopv':
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
          bot.solopv = isEnable
          break
          
        case 'gponly':
        case 'onlygp':
        case 'grouponly':
        case 'sologp':
        case 'sologrupo':
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
          bot.sologp = isEnable
          break

    case 'antispam':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.antiSpam = isEnable
      break;

    default:
      if (!/[01]/.test(command)) return m.reply(`
Lista de Opciones

*ADMIN*
welcome
antilink
antilink2
modoadmin
detect 
document
nsfw
onlylatinos
antidelete
antitoxic
simsimi
 
*USERS*
autolevelup

*OWNER*
antiprivado
public
solopv
sologp
antispam

*Ejemplo:*
*${usedPrefix}on* welcome
*${usedPrefix}off* welcome
`)
      throw false
  }

  m.reply(`*${type}* Se *${isEnable ? 'Activó' : 'Desactivó'}* ${isAll ? 'para este bot' : isUser ? '' : 'para este chat'}`.trim());
}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
