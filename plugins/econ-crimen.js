let handler = async (m) => {
  let time = global.db.data.users[m.sender].lasCrime + 7200000;
  if (new Date() - global.db.data.users[m.sender].lasCrime < 7200000)
    throw `te esta buscando la poli!, escondete durante ${msToTime(time - new Date())}!`;
  let result = Math.floor(Math.random() * 10);
  let reward = Math.floor(Math.random() * 20);
  if (result > 6) {
    m.reply(` ${pickRandom(global.exitosRobo)} $${reward} *DOLARES* de una chica!`);
    global.db.data.users[m.sender].dolares += reward * 1;
    global.db.data.users[m.sender].lasCrime = new Date() * 1;
  } else {
    m.reply(
      `${pickRandom(global.pillar)} para salir pagaste $${
        reward / 2
      } *DOLARES*`
    );
    global.db.data.users[m.sender].dolares -= Math.floor((reward / 2) * 1);
    global.db.data.users[m.sender].lasCrime = new Date() * 1;
  }
};
handler.help = ["crimen"];
handler.tags = ["econ"];
handler.command = ["crime", "crimen"];
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]}

global.pillar = [
  "La Policía te sorprendió en pleno robo y te arrestó. Para salir de la prisión, tuviste que pagar una fianza considerable.",
  "Tuviste un encuentro desafortunado con la Policía mientras cometías el robo y te detuvieron. Finalmente, saliste de la prisión tras pagar una multa importante.",
  "Mientras llevabas a cabo el robo, la Policía te capturó y te pusieron tras las rejas. Después de pagar una suma significativa, finalmente fuiste liberado.",
  "El robo no salió como lo planeaste, y la Policía te atrapó en el acto. Para recuperar tu libertad, tuviste que desembolsar una cantidad considerable de dinero."
];


  global.exitosRobo = [
    "El robo fue un éxito. Lograste quitarle",
    "Todo salió según lo planeado, y obtuviste",
    "La operación fue un completo éxito. Aprovechaste la oportunidad y te embolsaste",
    "La ejecución del robo resultó exitosa. Ahora tienes en tu poder",
    "El robo resultó ser un triunfo. Con éxito, adquiriste",
    "Tus habilidades de ladrón han dado sus frutos. Obtuviste",
    "Has demostrado ser un astuto ladrón. Ahora estás con",
    "El plan se ejecutó a la perfección. Has añadido",
    "El robo fue impecable. Sin dificultades, te hiciste",
    "Eres un maestro del sigilo. Con éxito, has adquirido"
  ];
  



function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + " m " + seconds + " s ";
}
