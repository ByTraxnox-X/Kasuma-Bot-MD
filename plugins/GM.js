/**
 *
 *  WELCOME TO INDONESIAN 
 *
 * where scripts are traded, 
 * and acknowledges as if the script is his
 * 
 * 
 * Credits:
 *  Syahrularranger (maker)
 *  FokusDotId (Remake)
 *
 */

const axios = require('axios')
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const game = `┌「 *Palabras continuas* 」
├ Conectar palabras son
│ juegos donde cada
│ el jugador debe crear
│ palabra del final de la palabra yang
│ proviene de la palabra anterior.
└────`.trim()
const rules = `
┌「 *REGLAMENTO* "
├ Las respuestas son palabras básicas.
│ es decir, no embarazada
│ espacios y afijos (me-, -an, etc.).
├ El jugador que sobreviva
│ ganar y ganar
│ 500XP × Número de jugadores.
├ escriba *.palabra*
│ para empezar
├ escribe *vencido*
│ rendirse
└────`.trim()
let poin = 500
let handler = async (m, { conn, usedPrefix, command, text, isPrems, isROwner }) => {
	let ikut = conn.pickRandom(['ven', 'sígueme', 'sígueme', 'melu cuk', 'melu ah', 'únete a mí', 'ven conmigo por favor gabut ya'])
	let isDebug = /debug/i.test(command) && isROwner
	conn.palabra = conn.palabra ? conn.palabra : {}
	let id = m.chat
	let kata = await genKata()
	let room_all = Object.values(conn.palabra).find(room => room.id !== id && room.player.includes(m.sender))
	if (room_all) throw 'Si estás jugando palabras de conexión en otro chat, primero termina el juego.';
	
	if (id in conn.palabra) {
		let room = conn.palabra[id]
		let member = room.player;
		if (room.status == 'play') {
			if (!room.waktu._destroyed && !room.diam) return conn.sendButton(m.chat, `Hola @${m.sender.split('@')[0]}, Todavía hay un juego en este chat. Espera hasta que termine el juego y únete al juego de conexión de palabras.`, wm, 'menu', usedPrefix + 'menu', room.chat).catch(e => { return !1 }) // ketika baileys error;
			delete conn.palabra[id]
		}
		if (text == 'start' && room.status == 'wait') {
			if (!member.includes(m.sender)) return conn.sendButton(m.chat, `\n aún no te has unido\n`, wm, ikut, usedPrefix + command, m)
			if (member.length < 2) throw 'Mínimo 2 personas para jugar al juego de palabras en cursiva.!'
			room.curr = member[0]
			room.status = 'play'
			room.chat = await conn.reply(m.chat, `es la hora de @${member[0].split('@')[0]}\nComenzar: *${(room.kata).toUpperCase()}*\n*${room.filter(room.kata).toUpperCase()}...?*\n\n*¡responda a este mensaje para responder!*\ncuando *vencido* para vencido\nTotal Player: ${member.length} Player`, m)
			room.win_point = 100
			for (let i of room.player) {
				let user = db.data.users[i]
				if(!('palabra' in user)) user.palabra = 0
			}
			clearTimeout(room.waktu_list)
			room.waktu = setTimeout(() => {
				conn.reply(m.chat, `\n   *¡Se acabó el tiempo de responder!*\n@${room.cur.split('@')[0]} ha sido eliminado`, room.chat).then(_ => {
					room.eliminated.push(room.curr)
					let index = member.indexOf(room.curr)
					member.splice(index, 1)
					room.curr = member[0]
					if (room.player.length == 1 && room.status == 'play') {
						db.data.users[member[0]].exp += room.win_point
						conn.sendButton(m.chat, `\n  @${member[0].split('@')[0]} Ganar!\n *+${room.win_point} XP*`, wm, 'Reanudar', usedPrefix + 'palabra', room.chat).then(_ => {
							delete conn.palabra[id]
							return !0
						});
					}
					room.diam = true;
					room.new = true;
					let who = room.curr
					conn.preSudo('nextkata', who, m).then(async _ => {
						conn.ev.emit('message.upsert', _)
					})
				})
			}, 45000)
		} else if (room.status == 'wait') {
			if (member.includes(m.sender)) throw 'te has unido a la lista';
			member.push(m.sender)
			clearTimeout(room.waktu_list)
			room.waktu_list = setTimeout(() => {
				conn.reply(m.chat, `\n ¡El tiempo ha expirado y la palabra conectar no comenzó o fue cancelada!`, room.chat).then(() => { delete conn.palabra[id] })
			}, 120000)
			let caption = `
┌「 *Lista de jugadores* 」
${member.map((v, i) => `├ ${i + 1}. @${v.split('@')[0]}`).join('\n')}
└────

*Note:*
Sambung kata akan dimainkan sesuai urutan Player *(bergiliran)*, dan hanya bisa dimainkan oleh Player yang terdaftar.

Ketik *${usedPrefix + command}* untuk bergabung
*${usedPrefix + command} start* untuk memulai permainan.
`.trim()
			room.chat = await conn.send2Button(m.chat, caption, wm, ikut, usedPrefix + 'palabra', 'mulai', '.palabra start', m)
		}
	} else {
		conn.palabra[id] = {
			id,
			player: isDebug ? owner.map(v => v + '@s.whatsapp.net') : [],
			status: 'wait',
			eliminated: [],
			basi: [],
			diam: false,
			win_point: 0,
			curr: ' ',
			kata,
			filter,
			genKata,
			chat: conn.reply(m.chat, game + "\n" + readMore + rules, m),
			waktu: false
		}
	}
}
handler.help = ['conectar palabras']
handler.tags = ['games']
handler.command = /^s(palabrapvp)?kata(debug)?$/i
handler.group = true

module.exports = handler

async function genKata() {
	let res = await axios.get(global.API('males', '/sambungkata')).catch(err => { return !0 })
	let result = res.data.kata
	while (result.length < 3 || result.length > 7) {
		res = await axios.get(global.API('males', '/sambungkata')).catch(err => { return !0 })
		result = res.data.kata
	}
	return result
}

function filter(text) {
	let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
	let misah
	if (text.length < 3) return text
	// alarm
	if (/([qwrtypsdfghjklzxcvbnm][qwrtypsdfhjklzxcvbnm])$/.test(text)) {
		let mid = /([qwrtypsdfhjklzxcvbnm])$/.exec(text)[0]
		return mid
	}

	// mati + voc + ng {kijang, pisang, dalang, dll}

	if (/([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.test(text)) {
		let mid = /([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.exec(text)[0]
		return mid
	}
	// voc2x + mati(optional) {portofolio, manusia, tiup, dll}
	else if (/([aiueo][aiueo]([qwrtypsdfghjklzxcvbnm]|ng)?)$/i.test(text)) {
		if (/(ng)$/i.test(text)) return text.substring(text.length - 3) // ex tiang, riang, siang
		else if (/([qwrtypsdfghjklzxcvbnm])$/i.test(text)) return text.substring(text.length - 2)
		else return text.substring(text.length - 1)
	}
	// ng/ny + voc + mati { sinyal, langit, banyak, dll}
	else if (/n[gy]([aiueo]([qwrtypsdfghjklzxcvbnm])?)$/.test(text)) {
		let nyenye = /n[gy]/i.exec(text)[0]
		misah = text.split(nyenye)
		return nyenye + misah[misah.length - 1]
	}
	// mati { kuku, batu, kamu, aku, saya, dll}
	else {
		let res = Array.from(text).filter(v => mati.includes(v))
		let resu = res[res.length - 1]
		for (let huruf of mati) {
			if (text.endsWith(huruf)) {
				resu = res[res.length - 2]
			}
		}
		misah = text.split(resu)
		if (text.endsWith(resu)) {
			return resu + misah[misah.length - 2] + resu
		}
		return resu + misah[misah.length - 1]
	}
}