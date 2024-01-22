
const otorgarRecompensa = () => {
    const recompensas = {
        exp: 250,
        dolares: 100
    };
    const moneda = Math.random() < 0.5 ? 'exp' : 'dolares'; // Escoger aleatoriamente entre exp y dolares
    return recompensas[moneda];
}

const lanzarPiedra = (intensidad) => {
    const fuerza = Math.random() * 10 * intensidad;
    return fuerza;
}

const romperEnvase = () => {
    const intensidad = Math.random(); // La intensidad del lanzamiento varía
    const fuerza = lanzarPiedra(intensidad);
    if (fuerza > 5) {
        const recompensa = otorgarRecompensa();
        return `¡Rompió el envase de vidrio! ¡Ganaste! Has recibido ${recompensa} ${recompensa === 'exp' ? "de experiencia" : "dólares"}`;
    } else {
        return 'No rompió el envase de vidrio, perdiste';
    }
}

const handler = async (message) => {
    const result = romperEnvase();
    message.reply(result);
};

handler.command = 'lanzapiedra';
handler.desc = 'Juego de lanzar piedra para romper un envase de vidrio';
handler.register = true;
export default handler;