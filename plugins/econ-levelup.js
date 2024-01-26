import { canLevelUp, xpRange } from '../lib/levelling.js';
import axios from 'axios';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/nHHUm1a.png');
    let user = global.db.data.users[m.sender];

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
*LEVEL*
Nombre: *${name}*
Nivel: *${user.level}*
XP: *${user.exp - min}/${xp}*
Rango: *${user.role}*

Te falta *${max - user.exp}* de *XP* para subir de nivel`.trim();

        try {
            let imgg = await axios.get(`https://api.popcat.xyz/welcomecard`, {
                params: {
                    background: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png',
                    text1: name,
                    text2: 'No%20es%20suficiente%20para%20subir%20de%20nivel',
                    text3: `XP:%20${user.exp - min}/${xp}`,
                    avatar: pp,
                },
            });

            conn.sendFile(m.chat, imgg.data, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let before = user.level * 1;

        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

        if (before !== user.level) {
            user.role = global.rpg.role(user.level).name;

            let str = `
*LEVEL UP*
Nombre: *${name}*
Nivel anterior: *${before}*
Nivel actual: *${user.level}*
Rango: *${user.role}*

¡Felicidades! Has subido de nivel`.trim();

            try {
                let img = await axios.get(`https://api.popcat.xyz/welcomecard`, {
                    params: {
                        background: 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png',
                        text1: name,
                        text2: 'Ha%20subido%20de%20nivel',
                        text3: `Nuevo%20nivel: ${user.level}`,
                        avatar: pp,
                    },
                });

                conn.sendFile(m.chat, img.data, 'levelup.jpg', str, m);
            } catch (e) {
                m.reply(str);
            }
        }
    }
};

handler.help = ['nivel'];
handler.tags = ['econ'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];

export default handler;
