let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Mencione a un usuario o ingrese su nombre`
    if (command == 'gay2') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES 🏳️‍🌈 ${(500).getRandom()}% GAY
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'lesbiana') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES 🏳️‍🌈 ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'pajero') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES 😏💦 ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'pajera') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES 😏💦 ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'puto') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'puta') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'hetero') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'pendejo') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'pendeja') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'prostituto') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'prostituta') {
        conn.reply(m.chat, `
${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'esquizofrenico') {
        conn.reply(m.chat, `
    ${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
    `.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'adoptado') {
        conn.reply(m.chat, `
        ${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
        `.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'colorcarton') {
        conn.reply(m.chat, `
            ${text.toUpperCase()} ES ${(500).getRandom()}% ${command.replace('how', '').toUpperCase()}
            `.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'medirpene') {
        conn.reply(m.chat, `
${text.toUpperCase()} TU TAMAÑO DE PENE ES ${(30).getRandom()} CM
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
    if (command == 'duraenlacama') {
        conn.reply(m.chat, `
${text.toUpperCase()} TU DURACION EN LA CAMA ES DE ${(5).getRandom()} MINUTOS
`.trim(), m, m.mentionedJid ? {
            mentions: m.mentionedJid
        } : {})
    }
}
handler.help = ['gay2', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'hetero', 'pendeja', 'pendejo', 'prostituta', 'prostituto', 'esquizofrenico', 'adoptado', 'colorcarton', 'medirpene', 'duraenlacama'].map(v => v + ' @tag | nombre')
handler.tags = ['fun']
handler.command = /^gay2|lesbiana|pajero|pajera|puto|puta|hetero|pendejo|pendeja|prostituta|prostituto|esquizofrenico|adoptado|colorcarton|duraenlacama|medirpene/i
export default handler