import similarity from 'similarity'
const threshold = 0.72
let handler = {
async before(m) {
let id = m.chat
if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/ADIVINA EL TITULO DE LA CANCION/i.test(m.quoted.text)) return !0
this.adivina_la_cancion = this.adivina_la_cancion ? this.adivina_la_cancion : {}
if (!(id in this.adivina_la_cancion)) return m.reply('El juego ha terminado')
if (m.quoted.id == this.adivina_la_cancion[id][0].id) {
let json = JSON.parse(JSON.stringify(this.adivina_la_cancion[id][1]))
if (m.text.toLowerCase() == json.respuestas_kasumabot.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += this.adivina_la_cancion[id][2]
m.reply(`✅Correcto!\n+${this.adivina_la_cancion[id][2]} XP`)
clearTimeout(this.adivina_la_cancion[id][3])
delete this.adivina_la_cancion[id]
} else if (similarity(m.text.toLowerCase(), json.respuestas_kasumabot.toLowerCase().trim()) >= threshold) m.reply(`Casi!!!!`)
else m.reply(`❌Incorrecto!`)
}
return !0
},
exp: 0
}
export default handler
