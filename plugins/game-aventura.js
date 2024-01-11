let handler = async (m, { conn, text, usedPrefix, command, args }) => {

  conn.aventure = conn.aventure ? conn.aventure : {}

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let username = conn.getName(who)

  let users = global.db.data.users[m.sender];
  let daño = 10;

  if (command == 'empezarapocalypto') {
    m.reply(`Hola ${username}, estas a punto de empezar a vivir un apocalypto!`)
    throw `Segun los noticieros en la ciudad de "Brooksdale" esta en una crisis sanitaria debido a un virus llamado "CioVirus". Este virus es de contagio entre seres humanos y consiste en una enfermedad que te convierte en zombie, empezando un insomio, hambruna, ojos rojos. El estado recomienda  abandonar la ciudad cuanto antes.\n*Tienes dos opciones, irte de la ciudad o quedarte a esperar que la ciudad calme o empeore.*\n\n${usedPrefix}apocalypto irse\n${usedPrefix}apocalypto esperar`
  }

  // Opción de "empezar apocalypto"
  if (command == 'apocalypto') {

    if (args[0] == "esperar") {
      m.reply(`Has decidido esperar a que se calme la ciudad, por ahora la ciudad tiene 10,000 contagiados de CioVirus, tu vida esta corriendo peligro en la ciudad. El departamento de salud recomienda irse a zonas apartadas de la ciudad para evitar riesgo de contagio.\n\n${usedPrefix + command} irse\n${usedPrefix + command} quedarse`)
    }
    // ...
    // Opción de "esperar"
    if (args[0] == "quedarse") {
      m.reply(`Apesar de las advertencias que hizo el estado decides quedarte, el virus se apodero de el mundo. Todo es un caos, ya no hay recursos, y el estado anuncia un virus mortal de propagacion extrema.\n*Tienes solo una opcion y es irte.*\n\n${usedPrefix + command} irse`)
    }

    // Opción de "esperar y empezar apocalypto"
    if (args[0] == "irse") {
      m.reply(`Ante la inminente propagacion del virus, tomas la dificil decision de abandonar tu hogar en busca de un refugio seguro. Empacas lo esencial y emprendes un viaje incierto hacia lo desconocido. El mundo esta en caos, pero tu determinacion te impulsa a buscar una oportunidad para sobrevivir.\n*Tienes dos opciones, hay 2 ciudades, en Crestview hay personas con el virus, pero mas recursos para sobrevivir. En Rivertown no hay casos del virus, pero es una ciudad lejana y por lo tanto no tiene muchos recursos.*\n\n${usedPrefix}apocalypto Crestview\n${usedPrefix}apocalypto Rivertown`)
    }

    // Opción de irse (ciudad que tiene casos, pero tiene mas recursos.)
    if (args[0] == "crestview") {
      m.reply(`Has tomado una decision importante para tu supervivencia, la ciudad Crestview esta contagiada en su 50%, pero hay mas recursos que Rivertown. Esto te ayudara en una cierta parte para sobrevivir, pero los medios estan recomendando encerrarse en casa con los recursos necesarios.\n*Tienes dos opciones: explorar para encontrar un refugio mejor, o quedarte en casa.*\n\n${usedPrefix + command} explorar\n${usedPrefix + command} casa`)
    }

    // Opción de irse (ciudad que no tiene casos, pero tiene pocos recursos)
    if (args[0] == "rivertown") {
      m.reply(`Has tomado una decision importante para tu supervivencia, aqui no hay muchos recursos, pero no hay casos del virus. estas solo en la ciudad sin ningun recurso, esto no te podria beneficiar mucho, ya que sin recursos el nivel se pondra cada vez mas peor.\n*Tienes dos opciones: explorar para encontrar un refugio mejor, o quedarte en casa.*\n\n${usedPrefix + command} explorar\n${usedPrefix + command} casa*`)
    }

    // Opción de las 2 ciudades (explorar)
    if (args[0] == "explorar") {
      m.reply(`La decision de explorar ha tomado un rumbo de supervivencia, haciendote estar mas lejos de las ciudades para evitar el virus. Explorando has llegado a un bosque extenso, y has encontrado un gato dentro del bosque y decides llevartelo, luego de 3 horas caminando y que cayera la noche, encuentras una casa abandonada donde puedes quedarte a dormir o seguir tu camino.\n${usedPrefix + command} dormir\n${usedPrefix + command} caminar`)
    }
  }

  // Opción de dormir en la casa abandonada
  if (args[0] == "dormir") {
    // Implementación de curación adicional al usuario
    users.hp += 20; // Puedes ajustar la cantidad de curación según tus preferencias
    m.reply(`Te has refugiado en la casa abandonada. Después de una buena noche de sueño, te sientes revitalizado. Tu salud ha aumentado.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar`)
  }

  // Opción de continuar explorando
  if (args[0] == "caminar") {
    m.reply(`Decides seguir explorando el bosque. Mientras avanzas, escuchas ruidos extraños a tu alrededor. De repente, te encuentras con un grupo de zombies. Tienes dos opciones:\n\n${usedPrefix + command} luchar\n${usedPrefix + command} correr`)
  }

  // Opción de luchar contra los zombies
  if (args[0] == "luchar") {
    // Implementación de daño adicional al usuario
    users.hp -= 30; // Puedes ajustar la cantidad de daño según tus preferencias
    m.reply(`Te decides a luchar contra los zombies. Aunque logras eliminar algunos, sufres heridas en el proceso.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar`)
  }

  // Opción de correr de los zombies
  if (args[0] == "correr") {
    m.reply(`Decides correr para evitar el enfrentamiento directo con los zombies. Logras escapar temporalmente y te alejas del peligro. Sin embargo, el esfuerzo te ha agotado.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar`)
  }

  // Opción para continuar la historia después de las situaciones
  if (args[0] == "continuar") {
    m.reply(`Continuas tu viaje en el apocalipsis. A medida que avanzas, te das cuenta de que la situación empeora. ¿Cuál será tu próximo paso?\n\n${usedPrefix + command} buscar refugio\n${usedPrefix + command} buscar alimentos`)
  }

  // Opción de buscar refugio
  if (args[0] == "buscar" && args[1] == "refugio") {
    m.reply(`Decides buscar un refugio más seguro. Después de caminar durante horas, encuentras una antigua fábrica abandonada. Parece ser un lugar tranquilo, pero sientes que no estás solo. ¿Qué harás?\n\n${usedPrefix + command} explorar_fabrica\n${usedPrefix + command} descansar`)
  }

  // Opción de explorar la fábrica abandonada
  if (args[0] == "explorar_fabrica") {
    m.reply(`Te aventuras a explorar la fábrica. Encuentras suministros útiles y un lugar para descansar. Sin embargo, escuchas ruidos sospechosos. Tienes dos opciones:\n\n${usedPrefix + command} investigar_ruidos\n${usedPrefix + command} descansar_fabrica`)
  }

  // Opción de investigar los ruidos en la fábrica
  if (args[0] == "investigar_ruidos") {
    // Implementación de encuentro con otro superviviente
    m.reply(`Decides investigar los ruidos y te encuentras con otro sobreviviente. Se llama Carlos y también busca refugio. ¿Le permitirás unirse a ti en tu viaje?\n\n${usedPrefix + command} aceptar_carlos\n${usedPrefix + command} rechazar_carlos`)
  }

  // Opción de aceptar a Carlos como compañero
  if (args[0] == "aceptar_carlos") {
    m.reply(`Decides aceptar a Carlos como compañero. Juntos fortalecen sus posibilidades de supervivencia. ¿Cuál será su próximo destino?\n\n${usedPrefix + command} ciudad_cerca\n${usedPrefix + command} bosque_oscuro`)
  }

  // Opción de rechazar a Carlos
  if (args[0] == "rechazar_carlos") {
    m.reply(`Prefieres seguir solo y le agradeces a Carlos, quien continúa su camino. ¿Cuál será tu próximo destino?\n\n${usedPrefix + command} ciudad_cerca\n${usedPrefix + command} bosque_oscuro`)
  }

  // Opción de descansar en la fábrica abandonada
  if (args[0] == "descansar_fabrica") {
    // Implementación de curación adicional al usuario
    users.hp += 15; // Puedes ajustar la cantidad de curación según tus preferencias
    m.reply(`Decides descansar en la fábrica abandonada. Tu salud mejora con el descanso.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar_viaje`)
  }

  // Opción de buscar alimentos
  if (args[0] == "buscar" && args[1] == "alimentos") {
    m.reply(`Sales en busca de alimentos. Encuentras un supermercado abandonado. ¿Qué harás?\n\n${usedPrefix + command} explorar_supermercado\n${usedPrefix + command} saquear_supermercado`)
  }

  // Opción de explorar el supermercado abandonado
  if (args[0] == "explorar_supermercado") {
    m.reply(`Decides explorar el supermercado con cautela. Encuentras algunos alimentos no perecederos y suministros útiles. Sin embargo, escuchas ruidos provenientes de la trastienda. ¿Qué harás?\n\n${usedPrefix + command} investigar_ruidos_supermercado\n${usedPrefix + command} salir_supermercado`)
  }

  // Opción de investigar los ruidos en el supermercado
  if (args[0] == "investigar_ruidos_supermercado") {
    // Implementación de encuentro con zombis
    m.reply(`Decides investigar los ruidos y te encuentras con un grupo de zombis en la trastienda. ¡Estás en peligro! Tienes dos opciones:\n\n${usedPrefix + command} enfrentar_zombis\n${usedPrefix + command} escapar_supermercado`)
  }

  // Opción de enfrentar a los zombis
  if (args[0] == "enfrentar_zombis") {
    // Implementación de daño adicional al usuario
    users.hp -= 40; // Puedes ajustar la cantidad de daño según tus preferencias
    m.reply(`Te decides a enfrentar a los zombis. Logras eliminar algunos, pero sufres heridas graves en el proceso.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar_viaje`)
  }

  // Opción de escapar del supermercado
  if (args[0] == "escapar_supermercado") {
    m.reply(`Decides escapar del supermercado antes de que sea demasiado tarde. Logras salir a salvo, pero te das cuenta de que estás agotado.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar_viaje`)
  }

  // Opción de saquear el supermercado
  if (args[0] == "saquear_supermercado") {
    // Implementación de recursos adicionales
    users.recursos += 30; // Puedes ajustar la cantidad de recursos según tus preferencias
    m.reply(`Decides saquear el supermercado y encuentras una buena cantidad de alimentos y suministros.\nRecursos actuales: ${users.recursos}\n\n${usedPrefix + command} continuar_viaje`)
  }

  // Opción para continuar la historia después de las situaciones
  if (args[0] == "continuar_viaje") {
    m.reply(`Continúas tu viaje en el apocalipsis. La situación se vuelve más intensa a medida que avanzas. ¿Qué decisiones tomarás a continuación?\n\n${usedPrefix + command} enfrentar_desafio\n${usedPrefix + command} buscar_refugio_noche`)
  }

  // Opción de enfrentar nuevos desafíos
  if (args[0] == "enfrentar_nuevos_desafios") {
    m.reply(`El camino te presenta nuevos desafíos. ¿Estás listo para enfrentarlos?\n\n${usedPrefix + command} superar_desafio\n${usedPrefix + command} evitar_desafio`);
  }

  // Opción de explorar una ciudad devastada
  if (args[0] == "explorar_ciudad") {
    m.reply(`Decides explorar una ciudad devastada en busca de suministros. Mientras te aventuras entre los edificios en ruinas, encuentras signos de actividad zombi. ¿Qué harás?\n\n${usedPrefix + command} infiltrar_zombis\n${usedPrefix + command} esquivar_zombis`);
  }

  // Opción de infiltrarse entre zombis
  if (args[0] == "infiltrar_zombis") {
    // Implementación de encuentro con zombis peligrosos
    m.reply(`Decides infiltrarte entre los zombis para evitar ser detectado. Sin embargo, te encuentras con un grupo de zombis particularmente peligrosos. ¿Cómo manejarás la situación?\n\n${usedPrefix + command} luchar_zombis_peligrosos\n${usedPrefix + command} huir_zombis_peligrosos`);
  }

  // Opción de luchar contra zombis peligrosos
  if (args[0] == "luchar_zombis_peligrosos") {
    // Implementación de daño adicional al usuario
    users.hp -= 50; // Puedes ajustar la cantidad de daño según tus preferencias
    m.reply(`Te enfrentas a los zombis peligrosos y logras eliminar algunos, pero sufres heridas graves en el proceso.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar_viaje`);
  }

  // Opción de huir de zombis peligrosos
  if (args[0] == "huir_zombis_peligrosos") {
    m.reply(`Decides huir de los zombis peligrosos. Logras escapar, pero te das cuenta de que tu camino se vuelve más complicado.\nVida actual: ${users.hp}%\n\n${usedPrefix + command} continuar_viaje`);
  }
}

handler.help = handler.command = ['empezarapocalypto', 'apocalypto']
handler.tags = ['game']

export default handler
