const axios = require('axios')
const delay = ms => new Promise(res => setTimeout(res, ms))
const { newMessagesDB } = require("@adiwajshing/baileys")
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let handler = m => m

handler.before = async function (m) {
	this.palabra = this.palabra ? this.palabra : {}
	let id = m.chat
	if (!(id in this.palabra)) return !0
	let room = this.palabra[id]
	let users = db.data.users
	let _kata = await genKata()
	let member = room.player
	let bonus = rwd(500, 600)
	let lose_palabra
	let win_palabra
	function mmr(apa = '', jid = '') {

		let user = db.data.users[jid]
		if (apa == 'win') {
			if (user.palabra > 5000) win_palabra = rwd(5, 9)
			else if (user.palabra > 3000) win_palabra = rwd(5, 10)
			else if (user.palabra > 1500) win_palabra = rwd(10, 15)
			else if (user.palabra > 1000) win_palabra = rwd(15, 20)
			else if (user.palabra > 500) win_palabra = rwd(20, 30)
			else win_palabra = rwd(30, 50)
		} else {
			if (user.palabra > 8000) lose_palabra = rwd(35, 50)
			else if (user.palabra > 5000) lose_palabra = rwd(25, 30)
			else if (user.palabra > 3000) lose_palabra = rwd(20, 25)
			else if (user.palabra > 1500) lose_palabra = rwd(15, 19)
			else if (user.palabra > 1000) lose_palabra = rwd(10, 14)
			else if (user.palabra > 500) lose_palabra = rwd(5, 9)
			else lose_palabra = rwd(1, 5)
		}
		if (apa == 'win') return win_palabra
		else return lose_palabra
	}
	let who
	if (room.new) {
		if (!/nextkata/i.test(m.text)) return !0
		room.new = false
		room.killer = false
		room.kata = _kata
		room.chat = await this.reply(m.chat, `doblar @${room.curr.split(`@`)[0]} contestar.\nComenzar : *${(_kata).toUpperCase()}*\n*${room.filter(_kata).toUpperCase()}... ?*\n\n*¡Responde a este mensaje para obtener respuestas!*\nXP acumulado: ${room.win_point}\nRestante: \n${readaMore + room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, m)
	}
	if (room.diam) {
		if (!/nextkata/i.test(m.text)) return !0
		room.diam = false
		room.waktu = setTimeout(() => {
			lose_palabra = mmr('lose', room.curr)
			win_palabra = (room.killer ? mmr('win', room.killer) : null)
			this.reply(m.chat, `\n *se acabó el tiempo para responder las preguntas*\n@${room.curr.split`@`[0]} ha sido eliminado -${lose_palabra} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_palabra} MMR` : ''}`, room.chat)
			room.eliminated.push(room.curr)
			if (room.killer) {
				users[room.killer].palabra += win_palabra
				users[room.curr].palabra -= lose_palabra
			}
			let index = member.indexOf(room.curr)
			member.splice(index, 1)
			if (index == member.length) room.curr = member[0]
			else room.curr = member[index]
			if (member.length == 1 && room.status == 'play') {
				this.sendMessage(m.chat, `buena suerte @${member[0].split`@`[0]} ¡Porque sobrevivió!\n\n *+${room.win_point}XP*`, wm, 'continuado', '.palabra', room.chat)
				users[member[0]].exp += room.win_point
				delete this.palabra[id]
				return !0
			} else {
				room.diam = true
				room.new = true
				who = room.curr
				this.emit('chat-update', {
					jid: who,
					hasNewMessage: true,
					messages: newMessagesDB([this.cMod(m.chat, m, 'nextkata', who)])
				})
			}
		}, 30000)
	}
	if (room.curr == m.sender) {
		if (/vencido/i.test(m.text)) {
			lose_palabra = mmr('lose', room.curr)
			win_palabra = (room.killer ? mmr('win', room.killer) : null)
			clearTimeout(room.waktu)
			this.reply(m.chat, `@${room.curr.split`@`[0]} ha sido eliminado -${lose_palabra} MMR${room.killer ? `\n@${room.killer.split`@`[0]} +${win_palabra} MMR` : ''}`, room.chat)
			room.eliminated.push(room.curr)
			if (room.killer) {
				users[room.killer].palabra += win_palabra
				users[room.curr].palabra -= lose_palabra
			}
			let index = member.indexOf(room.curr)
			member.splice(index, 1)
			if (index == (member.length)) room.curr = member[0]
			else room.curr = member[index]
			if (member.length == 1 && room.status == 'play') {
				this.sendMessage(m.chat, `buena suerte @${member[0].split`@`[0]} ¡Porque sobrevivió!\n\n *+${room.win_point}XP*\n*+${win_palabra} MMR*`, wm, 'continuado', '.palabra', room.chat)
				users[member[0]].palabra += win_palabra
				users[member[0]].exp += room.win_point
				delete this.palabra[id]
				return !0
			}
			room.new = true
			room.diam = true
			who = room.curr
			this.emit('chat-update', {
				jid: who,
				hasNewMessage: true,
				messages: newMessagesDB([this.cMod(m.chat, m, 'nextkata', who)])
			})
		}
		if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return !0
		if (m.quoted.id == room.chat.id) {
			let answerF = (m.text.toLowerCase().split` `[0]).trim().replace(/[^a-z]/gi, '')
			let res = await axios.get(API('males', '/ceksambungkata', { kata: m.text.toLowerCase().split(` `)[0] })).catch(err => { return !0 })
			// if (!res.ok) throw `Error: ` + res.statusText;
			let checkF = await res.data
			if (!answerF.startsWith(room.filter(room.kata))) {
				return m.reply(`👎🏻\nLa respuesta debe partir de la palabra. *${room.filter(room.kata)}*`)
			} else if (!checkF.status) {
				return m.reply(`👎🏻\nDecir *${m.text.toUpperCase()}* inválido!`)
			} else if ((room.filter(room.kata)) == answerF) {
				return m.reply(`👎🏻\nTu respuesta es la misma que la pregunta, busca otra palabra.!`)
			} else if (room.basi.includes(answerF)) {
				return m.reply(`👎🏻\nDecir *${m.text.toUpperCase()}* ya ha sido usado!`)
			}
			clearTimeout(room.waktu)
			room.killer = room.curr
			users[m.sender].exp += bonus
			let waktunya = member.indexOf(room.curr)
			room.curr = member[waktunya + 1]
			if (waktunya + 1 >= member.length) room.curr = member[0]
			room.basi.push(answerF)
			room.win_point += 200
			room.chat = await this.reply(m.chat, `*👍 +${bonus}XP*\nGanador @${room.curr.split`@`[0]}\n*${room.filter(answerF).toUpperCase()}... ?*\n*responde a este mensaje para obtener respuestas!*\ncuando *vencido* rendirse\nXP acumulado: ${room.win_point}\nRestante: \n${readMore + room.player.map((v, i) => i + 1 + '. ' + users[v].name).join('\n')}`, m)
			room.diam = true
			room.kata = answerF
			who = room.curr
			this.emit('chat-update', {
				jid: who,
				hasNewMessage: true,
				messages: newMessagesDB([this.cMod(m.chat, m, 'nextkata', who)])
			})
			return !0
		}
	} else if (room.curr !== m.sender) {
		if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(Mulai|Tersisa) ?:/i.test(m.quoted.text)) return !0
		if (m.quoted.id == room.chat.id) {
			if (room.eliminated.includes(m.sender)) m.reply(`\n   _Oye, has sido eliminado, espera hasta que termine este juego._\n   *Buen intento, próximo juego.*`)
			else if (room.player.includes(m.sender)) {
				m.reply(`\n   _No es tu turno.._\n`)
			} else m.reply(`\n   _*No puedes responder esa pregunta.*_\n   Porque no te uniste a este juego\n\n   ¡Espera hasta que termine el juego y luego ven a jugar!`)
		} else m.reply(`\n   Ese asunto se acabó\n`)
	}
	return !0
}

module.exports = handler

async function genKata() {
	let res = await axios.get(global.API('males', '/sambungkata')).catch(err => { return !0 })
	let result = res.data.kata
	while (result.length < 3) {
		res = await axios.get(global.API('males', '/sambungkata')).catch(err => { return !0 })
		result = res.data.kata
	}
	return result
}

function rwd(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}