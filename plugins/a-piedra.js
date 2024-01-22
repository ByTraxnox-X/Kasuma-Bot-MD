
const otorgarRecompensa = () => {
    const exp = Math.floor(Math.random() * 1001); // Valor aleatorio entre 0 y 1000
    const dolares = Math.floor(Math.random() * 16); // Valor aleatorio entre 0 y 15
    const moneda = Math.random() < 0.7 ? 'exp' : 'dolares'; // 70% de probabilidad de recibir experiencia
    return { tipo: moneda, cantidad: moneda === 'exp' ? exp : dolares };
}

const lanzarPiedra = (intensidad) => {
    const fuerza = Math.random() * 10 * intensidad;
    return fuerza;
}

const romperEnvase = (users) => {
    const intensidad = Math.random(); // La intensidad del lanzamiento varía
    const fuerza = lanzarPiedra(intensidad);
    if (fuerza > 4) { // 70% de probabilidad de ganar
        const recompensa = otorgarRecompensa();
        if (recompensa.tipo === 'exp') {
            users.exp += recompensa.cantidad;
            return `¡Rompió el envase de vidrio! ¡Ganaste! Has recibido ${recompensa.cantidad} de experiencia 💥🎉`;
        } else {
            users.dolares += recompensa.cantidad;
            return `¡Rompió el envase de vidrio! ¡Ganaste! Has recibido ${recompensa.cantidad} dólares 💰💥🎉`;
        }
    } else {
        return '¡No rompió el envase de vidrio, perdiste! 😔';
    }
}

const handler = async (message, users) => {
    const result = romperEnvase(users);
    message.reply(result);
};

handler.command = 'lanzapiedra';
handler.desc = 'Juego de lanzar piedra para romper un envase de vidrio';
handler.register = true;
export default handler;