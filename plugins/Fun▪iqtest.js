let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['inteligencia @tag']
handler.tags = ['fun']
handler.command = /^(inteligencia)$/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'IQ es de: 1',
'IQ es de: 14',
'IQ es de: 23',
'IQ es de: 35',
'IQ es de: 41',
'IQ es de: 50',
'IQ es de: 67',
'IQ es de: 72',
'IQ es de: 86',
'IQ es de: 99',
'IQ es de: 150',
'IQ es de: 340',
'IQ es de: 423',
'IQ es de: 500',
'IQ es de: 676',
'IQ es de: 780',
'IQ es de: 812',
'IQ es de: 945',
'IQ es de: 1000',
'IQ es de: Ilimitado!!',
'IQ es de: 5000',
'IQ es de: 7500',
'IQ es de: 10000',
]
