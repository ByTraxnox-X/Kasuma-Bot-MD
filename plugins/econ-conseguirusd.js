//import db from '../lib/database.js'

let handler = async (m, { conn }) => {

  let hasil = Math.floor(Math.random() * 50)
  let time = global.db.data.users[m.sender].lastdolares + 3600000
  if (new Date - global.db.data.users[m.sender].lastdolares < 3600000) throw ` Espera *${msToTime(time - new Date())}* para regresar a tu trabajo`
  global.db.data.users[m.sender].dolares += hasil
  m.reply(`
  ${pickRandom(global.robar)} *${hasil} Dolares*`)
  global.db.data.users[m.sender].lastdolares = new Date * 1
}
handler.help = ['usd']
handler.tags = ['econ']
handler.command = ['minarusd', 'usd', 'mineusd'] 

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]}

  global.robar = [
    "Genial! has trabajado como jardinero hasta conseguir",
    "Genial! has trabajado como mecánico hasta conseguir",
    "Genial! has trabajado como electricista hasta conseguir",
    "Genial! has trabajado como oficinista hasta conseguir",
    "Genial! has trabajado como profesor hasta conseguir",
    "Genial! has trabajado como enfermero hasta conseguir",
    "Genial! has trabajado como camarero hasta conseguir",
    "Genial! has trabajado como programador hasta conseguir",
    "Genial! has trabajado como contador hasta conseguir",
    "Genial! has trabajado como peluquero hasta conseguir",
    "Genial! has trabajado como bombero hasta conseguir",
    "Genial! has trabajado como chef hasta conseguir",
    "Genial! has trabajado como diseñador gráfico hasta conseguir",
    "Genial! has trabajado como policía hasta conseguir",
    "Genial! has trabajado como arquitecto hasta conseguir",
    "Genial! has trabajado como secretario hasta conseguir",
    "Genial! has trabajado como recepcionista hasta conseguir",
    "Genial! has trabajado como farmacéutico hasta conseguir"
  ];
  


function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " hora(s) " + minutes + " minuto(s) " + seconds + " segundo(s)" 
}

