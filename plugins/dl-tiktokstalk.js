import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) {
            throw `Por favor, ingresa el username de un usuario de TikTok.`;
        }

        const apiUrl = `https://api.cafirexos.com/api/tiktokstalk?username=${args[0]}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.resultado) {
            const user = data.resultado;
            m.react(rwait);

            let userInfo = `*${user.username}*\n\n` +
                `*Nombre:* ${user.nickname || 'No proporcionado'}\n` +
                `*Seguidores:* ${user.followers}\n` +
                `*Siguiendo:* ${user.following}\n` +
                `*Descripción:* ${user.description || 'No proporcionada'}`;

            m.react(done);
            await conn.sendFile(m.chat, user.pp_thumbnail, 'profile.jpg', userInfo, m);
        } else {
            throw 'No se pudo obtener la información del usuario de TikTok.';
        }
    } catch (error) {
        throw `Ocurrió un error al procesar la solicitud: ${error}`;
    }
};

handler.help = ['tiktokstalk'];
handler.tags = ['dl'];
handler.command = /^tiktokstalk$/i;

export default handler;
