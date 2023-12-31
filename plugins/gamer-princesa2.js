let handler = async (m, { conn, args, usedPrefix, command }) => {
 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniciarJuego() {
  console.log('¡Bienvenido a la aventura para rescatar a la princesa!');
  console.log('Tu misión es encontrar y rescatar a la princesa del malvado dragón.');

  rl.question('¿Deseas entrar al castillo? (si/no)\n', (respuesta) => {
    if (respuesta.toLowerCase() === 'si') {
      console.log('Has entrado al castillo. Encuentras un pasillo oscuro. ¿Deseas avanzar? (si/no)');
      rl.question('', (respuesta) => {
        if (respuesta.toLowerCase() === 'si') {
          console.log('En el pasillo encuentras una puerta. Abres la puerta y encuentras al dragón.');
          console.log('El dragón te reta a un juego de adivinanzas. Si adivinas la respuesta correcta, podrás rescatar a la princesa.');
          rl.question('¿Qué tienes en tus bolsillos? (pista: algo que comienza con la letra "ll")\n', (respuesta) => {
            if (respuesta.toLowerCase() === 'llaves') {
              console.log('¡Correcto! Has rescatado a la princesa. ¡Felicidades!');
              rl.close();
            } else {
              console.log('Respuesta incorrecta. El dragón te ha capturado. Fin del juego.');
              rl.close();
            }
          });
        } else {
          console.log('Decides no avanzar. Fin del juego.');
          rl.close();
        }
      });
    } else {
      console.log('Decides no entrar al castillo. Fin del juego.');
      rl.close();
    }
  });
}

iniciarJuego();

}
handler.help = ['princesa2']
handler.tags = ['game']
handler.command = /^((princesa2|princesa22)?)$/i

export default handler
