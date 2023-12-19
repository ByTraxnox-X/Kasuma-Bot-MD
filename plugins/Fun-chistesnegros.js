let handler = async (m, { conn, text}) => {

m.reply(`${pickRandom(global.humornegro)}`)
}
handler.help = ['chistesnegros']
handler.tags = ['fun']
handler.command = ['chistesnegros', 'humornegro']
export default handler

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]}

global.humornegro = ["¿Porque los negros son zurdos? Porque no tienen derechos", "Doctor, ¿tendré cura? ¡Por supuesto, cura, misa y funeral!", "- papá que es ¿el humor negro? + ¿ves ése hombre sin brazos?. Dile que aplauda - pero papá soy ciego + exacto", "¿Qué hace un negro vomitando?Presumir de que comió", "El sexo anal es como la lechuga, no le gusta a los nenes", "porque la niña sin pies no puede jugar al futbol ? porque es mujer", "Como pueden caber 100 niños somalies en un auto? Tirales un pedazo de pan", "van dos negros en los asientos de atrás de una auto, quien va conduciendo? pues la policía de tu país", "¿En qué se parece una lasaña a las torres gemelas? Que sambas tienen carne molida en el fondo", "Qué escala las Torres gemelas? Spiderman Qué las sobrevuela? Superman Qué las atraviesa? Musulman", "Entra un negrito a estudiar derecho y le preguntan: - Señor, ¿qué rama va a escoger? Y el negro responde:- Ninguna rama, hijo puta... a mí me dan un pupitre como a los blancos.", "¿Por qué se cayó la niña del columpio? Por que no tenía brazos ¿por qué no la levantaron? Por que no tenía mamá", "¿Cómo abren los niños de áfrica una coca cola? Con las costillas", "Cuál es la parte más dura de un vegetal? La silla de ruedas...", "sabes que es una embarazada para una tribu caníbal? un huevo kínder", "mi humor es tan negro que me a robado la cartera", "Porque un niño sin piernas no puede iniciar sesión? usuario inválido", "sabes como defenderte si una mujer te intenta atacar con un cuchillo? le das pan y jamón y por instinto te hace un bocadillo", "que tienen en común una embarazada y una pizza quemada? que ambas son producto de no sacarla a tiempo", "Sabes que es lo malo de tener una hija con cancer? Que no podes agarrarle el pelo mientras te la cojes!"]
