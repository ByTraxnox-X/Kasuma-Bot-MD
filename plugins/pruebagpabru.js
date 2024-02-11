const handler = async (m, { conn, text }) => {
  const actions = text.split('|').map(action => action.trim());

  if (actions.length % 2 !== 0) {
    return conn.reply(m.chat, 'Por favor, proporciona un número par de acciones.', m);
  }

  for (let i = 0; i < actions.length; i += 2) {
    const action = actions[i].toLowerCase();
    const time = actions[i + 1].toUpperCase();

    if (!['abrir', 'cerrar'].includes(action)) {
      return conn.reply(m.chat, `Acción no válida: ${action}. Las acciones permitidas son "abrir" o "cerrar".`, m);
    }

    await performAction(conn, m, action);
    await conn.reply(m.chat, `Grupo ${action === 'abrir' ? 'abierto' : 'cerrado'} automáticamente.`, m);
  }
};

const performAction = async (conn, m, action) => {
  if (action === 'abrir') {
    await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, true);
  } else if (action === 'cerrar') {
    await conn.groupSettingChange(m.chat, conn.groupSettingChange.messageSend, false);
  }
};

handler.help = ['programar'];
handler.tags = ['ai'];
handler.command = /^programar$/i;

export default handler;
