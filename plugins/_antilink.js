const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
const linkRegex2 = /https:\/\/whatsapp\.com\/(?:channel\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;

    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};

    const isGroupLink = linkRegex.exec(m.text);
    const isGroupLink2 = linkRegex2.exec(m.text);

    if (chat.antiLink && (isGroupLink || isGroupLink2) && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return true;
        }

        await conn.reply(m.chat, `
> Hemos detectado un enlace de otro grupo
            
Lo siento *@${m.sender.split('@')[0]}*, serás expulsado del grupo ${isBotAdmin ? '' : '\n\nDebo ser administrador para eliminar el usuario.'}`, null, { mentions: [m.sender] } );

        if (isBotAdmin && chat.antiLink) {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } else if (!chat.antiLink) {
            return false;
        }
    }

    return true;
}
