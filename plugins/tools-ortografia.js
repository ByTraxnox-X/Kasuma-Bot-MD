//spell-checker-js latest "package"
import SpellChecker from 'spell-checker-js';

let handler = async (m, { conn, args }) => {
    let palabra = args[0];

    if (!palabra) {
        throw 'Por favor, proporciona una palabra para verificar la ortografía.';
    }

    const spellChecker = new SpellChecker();

    const esCorrecta = spellChecker.checkSpelling(palabra);

    let mensajeRespuesta;
    if (esCorrecta) {
        mensajeRespuesta = `${palabra} está escrita correctamente.`;
    } else {
        const sugerencias = spellChecker.getSuggestions(palabra);
        mensajeRespuesta = `La palabra "${palabra}" podría estar escrita incorrectamente. Sugerencias: ${sugerencias.join(', ')}`;
    }

    m.reply(mensajeRespuesta)
};

handler.help = ['ortografia <palabra>'];
handler.tags = ['tools'];
handler.command = ['ortografia'];

export default handler;