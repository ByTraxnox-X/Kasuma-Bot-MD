import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw `Ingrese el Username de Instagram`;
    }

    try {
        const apiUrl = `${apikasu}/api/tools/igstalk?username=${args[0]}&apikey=${apikeykasu}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.result) {
            const userInfo = data.result;

            const infoMessage = `> Informacion
*Username:* ${userInfo.username}
*Nombre:* ${userInfo.full_name}
*Biografía:* ${userInfo.biography}
*Enlace externo:* ${userInfo.external_url}
*Cuenta privada:* ${userInfo.is_private ? 'Sí' : 'No'}
*Verificado:* ${userInfo.is_verified ? 'Sí' : 'No'}

> Estadisticas
Posts: ${userInfo.posts}
Seguidores: ${userInfo.followers}
Siguiendo: ${userInfo.following}
${userInfo.external_url}
            `;

            await conn.sendFile(m.chat, userInfo.profile_pic_url, 'profile_pic.jpg', infoMessage, m);
        } else {
            throw '> Sin respuesta\nNo se pudo obtener la información de Instagram.';
        }
    } catch (error) {
        console.error(error);
        throw '> Sin respuesta\nOcurrió un error al procesar la solicitud';
    }
};

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['igstalk'];

export default handler;
