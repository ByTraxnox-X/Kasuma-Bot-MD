let handler = m => m

handler.before = async function (m) {
    this.caracruzpvp = this.caracruzpvp ? this.caracruzpvp : {}

    if (db.data.users[m.sender].caracruzpvp < 0) db.data.users[m.sender].caracruzpvp = 0

    let room = Object.values(this.caracruzpvp).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))

    if (room) {
        let win = ''
        let tie = false

        if (m.sender == room.p2 && /^(acc(ept)?|Aceptar|acerta|aceptar|gas|aceptare?|nao|Rechazar|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
            if (/^(Rechazar|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
                let textno = `@${room.p2.split`@`[0]} Acaba de rechazar el pvp, por lo que el juego será cancelado`
                m.reply(textno, null, { mentions: this.parseMention(textno) })
                delete this.caracruzpvp[room.id]
                return !0
            }
            room.status = 'play'
            room.asal = m.chat
            clearTimeout(room.waktu)

            let textplay = `El juego ha iniciado, por favor revisar sus chats privados @${room.p.split`@`[0]}, @${room.p2.split`@`[0]}.\n\nRecuerde que solo puede elegir una opción\n\n*Si no encuentra el chat ingrese a este enlace: wa.me/${conn.user.jid.split`@`[0]}*`
            m.reply(textplay, m.chat, { mentions: this.parseMention(textplay) })

            let comienzop = `Debes seleccionar una de las siguientes opciones\n\nCara\nCruz\n\n*Responde al mensaje con la opción*`
            let comienzop2 = `Debes seleccionar una de las siguientes opciones\n\nCara\nCruz\n\n*Responde al mensaje con la opción*`

            if (!room.pilih) this.sendMessage(room.p, { text: comienzop }, { quoted: m })
            if (!room.pilih2) this.sendMessage(room.p2, { text: comienzop2 }, { quoted: m })

            room.waktu_milih = setTimeout(() => {
                let iniciativa = `Ningún jugador inició el juego, este ha sido cancelado.`

                if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: iniciativa }, { quoted: m })
                else if (!room.pilih || !room.pilih2) {
                    win = !room.pilih ? room.p2 : room.p
                    let textnull = `@${(room.pilih ? room.p2 : room.p).split`@`[0]} No eligieron ninguna opción, ha terminado la partida.`
                    this.sendMessage(m.chat, { text: textnull }, { quoted: m }, { mentions: this.parseMention(textnull) })

                    db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
                    db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
                    db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
                }
                delete this.caracruzpvp[room.id]
                return !0
            }, room.timeout)
        }

        let jwb = m.sender == room.p
        let jwb2 = m.sender == room.p2
        let reg = /^(cara|cruz)/i

        if ((jwb || jwb2) && reg.test(m.text) && !room.pilih && !room.pilih2 && !m.isGroup) {
            room.pilih = reg.exec(m.text.toLowerCase())[0]
            room.text = m.text
            m.reply(`Has elegido ${m.text}, Regresa al grupo y ${room.pilih2 ? `*Revisa los resultados*` : '*Espera los resultados*'}`)

            if (!room.pilih2) this.reply(room.p2, `El oponente ya ha elegido, ahora te toca a ti`, m, 0)
        }

        if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup && room.pilih) {
            room.pilih2 = reg.exec(m.text.toLowerCase())[0]
            room.text2 = m.text
            m.reply(`Has elegido ${m.text}, Regresa al grupo y *Revisa los resultados*`)

            let stage = room.pilih
            let stage2 = room.pilih2

            clearTimeout(room.waktu_milih)

            if (stage === stage2) tie = true

            let options = ['cara', 'cruz']
            let machineChoice = random(options)
            room.machineChoice = machineChoice

            if (stage === machineChoice) win = room.p
            else if (stage2 === machineChoice) win = room.p2

            if (!tie) {
                db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
                db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
                db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
            }

            let resultado1 = stage === machineChoice ? `Ganaste` : `${room.p === win ? 'Ganaste' : 'Perdiste'}`
            let resultado2 = stage2 === machineChoice ? `Ganaste` : `${room.p2 === win ? 'Ganaste' : 'Perdiste'}`

            this.reply(room.asal, `*RESULTADOS*\n\n*Resultado:* ${machineChoice}\n\n@${room.p.split`@`[0]} (${room.text}) - ${resultado1}\n@${room.p2.split`@`[0]} (${room.text2}) - ${resultado2}`, m, { mentions: [room.p, room.p2] })

            delete this.caracruzpvp[room.id]
        }
    }
    return !0
}

handler.exp = 0
export default handler

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
