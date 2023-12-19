const linkRegexWhatsApp = /https:\/\/chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
const linkRegexYouTube = /https:\/\/(www\.)?youtube\.com\/\S+|https:\/\/youtu\.be\/\S+/i;
const linkRegexTikTok = /https:\/\/www\.tiktok\.com\/\S+/i;
const linkRegexInstagram = /https:\/\/www\.instagram\.com\/\S+/i;
const linkRegexGoogle = /https:\/\/www\.google\.com\/\S+/i;
const linkRegexTwitter = /https:\/\/twitter\.com\/\S+/i;
const linkRegexDiscord = /https:\/\/discord\.com\/\S+/i;
const linkRegexTelegram = /https:\/\/t\.me\/\S+/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLinkWhatsApp = linkRegexWhatsApp.exec(m.text);
    const isGroupLinkYouTube = linkRegexYouTube.exec(m.text);
    const isGroupLinkTikTok = linkRegexTikTok.exec(m.text);
    const isGroupLinkInstagram = linkRegexInstagram.exec(m.text);
    const isGroupLinkGoogle = linkRegexGoogle.exec(m.text);
    const isGroupLinkTwitter = linkRegexTwitter.exec(m.text);
    const isGroupLinkDiscord = linkRegexDiscord.exec(m.text);
    const isGroupLinkTelegram = linkRegexTelegram.exec(m.text);

    if (chat.antiLink2 && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            const linkWhitelist = [
                linkThisGroup,
                "https://www.youtube.com/",
                "https://youtu.be/",
                "https://www.tiktok.com/",
                "https://www.instagram.com/",
                "https://www.google.com/",
                "https://twitter.com/",
                "https://discord.com/",
                "https://t.me/"
            ];

            if (linkWhitelist.includes(m.text)) return !0;
        }

        if (isGroupLinkWhatsApp || isGroupLinkYouTube || isGroupLinkTikTok || isGroupLinkInstagram || isGroupLinkGoogle || isGroupLinkTwitter || isGroupLinkDiscord || isGroupLinkTelegram) {
            await conn.reply(m.chat, `Enlace Detectado
            
            No permitimos enlaces de plataformas exteriores a WhatsApp

            Lo siento *@${m.sender.split('@')[0]}*, serás expulsado del grupo${isBotAdmin ? '' : '\n\nDebo ser administrador para eliminar el usuario.'}`, null, { mentions: [m.sender] });

            if (isBotAdmin && chat.antiLink2) {
                await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            } else if (!chat.antiLink2) return !0;
        }
    }
    return !0;
}
