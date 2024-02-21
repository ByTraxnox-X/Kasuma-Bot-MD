import fetch from 'node-fetch';
import { createDB } from 'json-db4';

// Crear una base de datos
const db = createDB('temporal-bot-db.json');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let costoPorToken = 800; // Precio en dólares por token
    let tiempoPorToken = 40; // Tiempo en minutos por cada token

    if (args.length < 2 || args[1].toLowerCase() !== 'token') {
        return await conn.reply(m.chat, `Usa ${usedPrefix}${command} <cantidad> token para comprar tiempo.`, m);
    }

    let cantidadTokens = parseInt(args[0]);

    if (isNaN(cantidadTokens) || cantidadTokens <= 0) {
        return await conn.reply(m.chat, `Ingresa una cantidad válida de tokens para comprar tiempo.`, m);
    }

    let tiempoCompra = cantidadTokens * tiempoPorToken;
    let costoTotal = cantidadTokens * costoPorToken;

    // Añadir lógica para agregar el bot al grupo
    await conn.groupAdd(m.chat, [conn.user.jid]);

    // Guardar información en la base de datos
    db.set(m.chat, { tiempoRestante: tiempoCompra });
    db.save();

    // Lógica para gestionar el tiempo
    setTimeout(async () => {
        // Quitar el bot del grupo después de que expire el tiempo
        await conn.groupRemove(m.chat, [conn.user.jid]);

        // Eliminar la información de la base de datos después de que expire el tiempo
        db.delete(m.chat);
        db.save();
    }, tiempoCompra * 60 * 1000);

    return await conn.reply(m.chat, `El bot ha sido añadido al grupo por ${tiempoCompra} minutos. El costo total es de $${costoTotal}. Puedes realizar el pago para activar el servicio.`, m);
};

// Agregar función para obtener información de tiempo
handler.getTime = (chatId) => {
    return db.get(chatId)?.tiempoRestante || 0;
};

handler.help = ['bottemporal'];
handler.tags = ['fun'];
handler.command = /^(bottemporal)$/i;
handler.group = true;

export default handler;
