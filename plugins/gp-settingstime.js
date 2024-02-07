let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let isAuto = args[0].toLowerCase() === 'auto';
        let isOpen = args[1].toLowerCase() === 'abrir';
        let isClose = args[1].toLowerCase() === 'cerrar';

        if (!(isAuto || isOpen || isClose))
            throw `
*Elija una opción:*
  *${usedPrefix + command} abrir*
  *${usedPrefix + command} cerrar*
  *${usedPrefix + command} auto <hora_inicio|hora_fin>*
`.trim();

        if (isAuto) {
            let [start, end] = args[2].match(/\b\d{1,2}:\d{2}[APMapm]{2}\b/g) || [];
            if (!start || !end) {
                m.reply("Formato de hora incorrecto. Utiliza un formato como 8:30AM|9:30PM");
                throw false;
            }

            const setGroupSettingAtTime = async (isOpen, time) => {
                await conn.groupSettingUpdate(m.chat, isOpen ? 'not_announcement' : 'announcement');
                m.reply(`Grupo ${isOpen ? 'abierto' : 'cerrado'} automáticamente. Próximo evento a las ${time}`);
            };

            setGroupSettingAtTime(isOpen, start); // Abrir o cerrar grupo
            setGroupSettingAtTime(!isOpen, end); // Cerrar o abrir grupo
        } else {
            let isSetting = isOpen ? 'not_announcement' : 'announcement';
            await conn.groupSettingUpdate(m.chat, isSetting);
            m.reply(`Grupo ${isOpen ? 'abierto' : 'cerrado'} manualmente.`);
        }
    } catch (error) {
        console.error(error);
        // Manejar cualquier error aquí
    }
}

handler.help = ['grupotime abrir/cerrar/auto <hora_inicio|hora_fin>'];
handler.tags = ['group'];
handler.command = ['timegrupo', 'grupotime'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
