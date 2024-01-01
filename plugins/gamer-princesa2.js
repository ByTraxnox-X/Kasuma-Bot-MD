let handler = async (m, { conn, args, usedPrefix, command }) => {

  m.reply('¡Bienvenido a la aventura para rescatar a la princesa!')
  m.reply('Tu misión es encontrar y rescatar a la princesa del malvado dragón.')

  rl.question('¿Deseas entrar al castillo? (si/no)\n', (respuesta) => {
    if (respuesta.toLowerCase() === 'si') {
      m.reply('Has entrado al castillo. Encuentras un pasillo oscuro. ¿Deseas avanzar? (si/no)');
      rl.question('', (respuesta) => {
        if (respuesta.toLowerCase() === 'si') {
          m.reply('En el pasillo encuentras una puerta. Abres la puerta y encuentras al dragón.');
          m.reply('El dragón te reta a un juego de adivinanzas. Si adivinas la respuesta correcta, podrás rescatar a la princesa.');
          rl.question('¿Qué tienes en tus bolsillos? (pista: algo que comienza con la letra "ll")\n', (respuesta) => {
            if (respuesta.toLowerCase() === 'llaves') {
              m.reply('¡Correcto! Has rescatado a la princesa. ¡Felicidades!');
              rl.close();
            } else {
              m.reply('Respuesta incorrecta. El dragón te ha capturado. Fin del juego.');
              rl.close();
            }
          });
        } else {
          m.reply('Decides no avanzar. Fin del juego.');
          rl.close();
        }
      });
    } else {
      m.reply('Decides no entrar al castillo. Fin del juego.');
      rl.close();
    }
  ;
}
}
handler.help = ['juego']
handler.tags = ['game']
handler.command = /^(juego)$/i
export default handler;
