let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix }) => {
    try {
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn);
            throw false;
        }

        if (args.length !== 2) {
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
        let duration = parseInt(args[1]);

        if (isNaN(duration) || duration <= 0) {
            throw 'La duración debe ser un número mayor que 0.';
        }

        let isClose = action === 'cerrargrupoen';

        await conn.groupSettingUpdate(m.chat, isClose ? 'announcement' : 'not_announcement');
        m.reply(`Grupo ${isClose ? 'cerrado' : 'abierto'} durante ${duration} hora(s).`);

        setTimeout(async () => {
            await conn.groupSettingUpdate(m.chat, isClose ? 'not_announcement' : 'announcement');
            conn.reply(m.chat, `Grupo ${isClose ? 'abierto' : 'cerrado'} automáticamente después de ${duration} hora(s).`);
        }, duration * 60 * 60 * 1000);
    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error. Por favor, verifica el formato del comando.');
    }
};

handler.help = ['abrirgrupoen <duración_en_horas>', 'cerrargrupoen <duración_en_horas>'];
handler.tags = ['group'];
handler.command = /^(abrirgrupoen|cerrargrupoen)$/i;

handler.botAdmin = true;
handler.group = true;

export default handler;
