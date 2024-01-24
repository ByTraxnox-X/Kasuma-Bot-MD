import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) {
            throw `Por favor, ingresa el username de un usuario de TikTok.`;
        }

        const apiUrl = `${apivisionary}/api/tiktokstalk?username=${args[0]}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.resultado) {
            const user = data.resultado;
            m.react(rwait)

            let userInfo = `*${user.username}*

*Nombre:* ${user.nickname || 'No proporcionado'}
*Seguidores:* ${user.followers}
*Siguiendo:* ${user.following}
*Descripción:* ${user.description || 'No proporcionada'}`;

            m.react(done)
            conn.sendFile(m.chat, user.pp_thumbnail, 'profile.jpg', userInfo, m);
            conn.sendMessage(m.chat, userInfo);
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
