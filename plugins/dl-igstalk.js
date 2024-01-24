import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Ingrese el Username de Instagram`;
    }

    try {
        const apiUrl = `${apivisionary}/api/igstalk?username=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.resultado) {
            const resultado = data.resultado;
            m.react(rwait)
            const te = `*${resultado.name}*
            
*Username:* ${resultado.username}
*Seguidores:* ${resultado.followersH}
*Siguiendo:* ${resultado.followingH}
*Bio:* ${resultado.description}
*Posts:* ${resultado.postsH}
*Link:* https://instagram.com/${resultado.username.replace(/^@/, '')}
`;
            m.react(done)
            await conn.sendFile(m.chat, resultado.profilePic, 'igstalk.png', te, m);
        } else {
            throw 'No se pudo obtener la información de Instagram.';
        }
    } catch (error) {
        m.reply('Revisa que el nombre de usuario sea de *Instagram*');
    }
}

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['igstalk'];

export default handler;
