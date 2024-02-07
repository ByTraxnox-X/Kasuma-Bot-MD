let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
    }

    if (!args[0] || !args[1]) {
        throw `
*FORMATO ERRONEO!!*

Uso:
  *${usedPrefix}abrirgrupoen <duración_en_horas>*
  *${usedPrefix}cerrargrupoen <duración_en_horas>*
  
Ejemplo de uso:
  *${usedPrefix}abrirgrupoen 1*
  *${usedPrefix}cerrargrupoen 1*
  
Para abrir o cerrar el grupo por una duración específica.
`;
    }

    let action = args[0].toLowerCase();
    let duration = parseInt(args[1]) || 0;

    let isClose = {
        'abrir': 'not_announcement',
        'cerrar': 'announcement',
    }[action];

    if (isClose === undefined) {
        throw `
*FORMATO ERRONEO!!*

Uso:
  *${usedPrefix}abrirgrupoen <duración_en_horas>*
  *${usedPrefix}cerrargrupoen <duración_en_horas>*
  
Ejemplo de uso:
  *${usedPrefix}abrirgrupoen 1*
  *${usedPrefix}cerrargrupoen 1*
  
Para abrir o cerrar el grupo por una duración específica.
`;
    }

    let timeoutset = duration * 3600000;

    await conn.groupSettingUpdate(m.chat, isClose).then(async _ => {
        m.reply(`Grupo ${isClose == 'announcement' ? 'cerrado' : 'abierto'} ${duration ? `durante*${clockString(timeoutset)}*` : ''}`);
    });

    if (duration) {
        setTimeout(async () => {
            await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async _ => {
                conn.reply(m.chat, `${isClose == 'not_announcement' ? '*El grupo ha sido cerrado, ahora solo los administradores pueden enviar mensajes!*' : '*El grupo se ha abierto, ahora todos los miembros pueden enviar mensajes!*'}!`);
            });
        }, timeoutset);
    }
};

handler.help = ['abrirgrupoen <duración_en_horas>', 'cerrargrupoen <duración_en_horas>'];
handler.tags = ['group'];
handler.command = /^(abrirgrupoen|cerrargrupoen)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms, h, m, s });
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
