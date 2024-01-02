let handler = async (m, { conn, text, usedPrefix, command, args }) => {

  conn.aventure = conn.aventure ? conn.aventure : {}

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)



  if (command == 'empezarapocalypto') {
    m.reply(`Hola ${username}, estas a punto de empezar a vivir un apocalypto!`)
    throw `Segun los noticieros la ciudad de "Brooksdale" esta en una crisis sanitaria debido a un virus llamado "CioVirus". Este virus es de contagio entre seres humanos y consiste en una enfermedad que te convierte en zombie, empezando un insomio, hambruna, ojos rojos. El estado recomienda  abandonar la ciudad cuanto antes. *Tienes dos opciones, irte de la ciudad o quedarte a esperar que la ciudad calme o empeore.*\n\n${usedPrefix}apocalypto irse\n${usedPrefix}apocalypto esperar`
  }

  //opcion de "emprezar apocalypto"
  if (command == 'apocalypto') {

    if (args[0] == "esperar") {
      m.reply(`Has decidido esperar a que se calme la ciudad, por ahora la ciudad tiene 10,000 contagiados de CioVirus, tu vida esta corriendo peligro en la ciudad. El departamento de salud recomienda irse a zonas apartadas de la ciudad para evitar riesgo de contagio. \n\n${usedPrefix + command} irse\n${usedPrefix + command} quedarse`)
    }

    //opcion de "esperar"
    if (args[0] == "quedarse") {
      m.reply(`Apesar de las advertencias que hizo el estado decides quedarse, el virus se apodero de el mundo. Todo es un caos, ya no hay recursos, y el estado anunncia un virus mortal de propagacion eextrema. Tienes solo una opcion y es irte.\n\n${usedPrefix + command} irse`)
    }

    //opcion de "esperar y empezar apocalypto"
    if (args[0] == "irse") {
    m.reply(`Ante la inminente propagacion del virus, tomas la dificil decision de abandonar tu hogar en busca de un refugio seguro. Empacas lo esencial y emprendes un viaje incierto hacia lo desconocido. El mundo esta en caos, pero tu determinacion te impulsa a buscar una oportunidad para sobrevivir. *Tienes dos opciones, hay 2 ciudades, en Crestview hay personas con el virus, pero mas recursos para sobrevivir, y en Rivertown no hay casos del virus, pero es una ciudad lejana y por lo tanto no tiene muchos recursos, tu decides*\n\n${usedPrefix}apocalypto Crestview\n${usedPrefix}apocalypto Rivertown`)
    }

    // opcion de irse (ciudad que tiene casos, pero tiene mas reccursos.)
    if (args[0] == "Crestview") {
      m.reply(`Has tomado una decision importante para tu supervivencia, la ciudad Crestview esta contagiada en su 50%, pero hay mas recursos que Rivertown. Esto te ayudara en una cierta parte para sobrevivir, pero los medios estan recomendando encerrarse en casa con los recursos necesarios. *Tienes dos opciones: explorar para encontrar un refugio mejor, o quedarte en casa.\n\n${usedPrefix + command} explorando\n${usedPrefix + command} casa`)
    }
    
    //opcion de irse (ciudad que no tiene casos, pero tiene pocos recursos)
    if (args[0] == "Rivertown") {
      m.reply(`Has tomado una decision importante para tu supervivencia, aqui no hay muchos recursos, pero no hay casos del virus. estas solo en la ciudad sin ningun recurso, esto no te podria beneficiar mucho, ya que sin recursos el nivel se pondra cada vez mas peor.*Tienes dos opciones: explorar para encontrar un refugio mejor, o quedarte en casa.\n\n${usedPrefix + command} explorar\n${usedPrefix + command} casa*`)
    
    }

    //opcion de las 2 ciudades (explorar)
    if (args[0] == "explorar") {
      m.reply(`La decision de explorar ha tomado un rumbo de supervivencia, haciendote estar mas lejos de las ciudades para evitar el virus. Explorando has llegado a un bosque exttenso, y has encontrado un gato dentro del bosque y decides l`)
  }

}
}

handler.help = handler.command = ['empezarapocalypto', 'apocalypto']
handler.tags = ['game']

export default handler