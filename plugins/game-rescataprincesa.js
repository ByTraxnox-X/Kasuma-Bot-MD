let handler = async (m, { conn, args, usedPrefix, command }) => {
let users = global.db.data.users[m.sender]




  if (args[0] == "ayudar"){
m.reply(`Estas Corriendo a ayudarla, *te caes* andas cojo,\n\n.princesa seguir\n.princesa dejarla?`)
}

if (args[0] == "dejarla"){
m.reply('Dejastes a la princesa')
}

if (args[0] == "seguir"){
m.reply('Te levantas del piso, luego de ese madrazo que te distes, estás corriendo x2, los alcanzaste, los golpeas, pero ellos no se dejan, te tiran al suelo te amarran con un cabo.\n\n.princesa desatarme\n.princesa dejarla')
}

if (args[0] == "desatarme"){
m.reply('Oh, te has desatado, ahora le estás dando duro, los golpeas, \nenemigo: porfavor ya no, me rindo, estás con la princesa\n\n.princesa llevarla\n.princesa dejarla')
}

if (args[0] == "llevarla"){
m.reply('Rescataste a la princesa, el rey te está agradeciendo mucho por ayudar a la princesa, de recompensa te va a dar $250')
users.dolares += 250
}
        





}

handler.help = ['princesa'];
handler.tags = ['game'];
handler.command = /^princesa$/i;

export default handler;