import validator from 'validator';

let handler = async (m, { args }) => {
    let correoElectronico = args[0];

    if (!correoElectronico) {
        throw 'Por favor, proporciona una dirección de correo electrónico.';
    }



    let esValida = validator.isEmail(correoElectronico);

    let mensajeRespuesta = esValida ? `La dirrecion de correo ${correoElectronico} es valido.` : `La dirrecion de correo ${correoElectronico} no es valido.`;

    m.reply(`${mensajeRespuesta}`)
};

handler.help = ['validarcorreo <correo electrónico>'];
handler.tags = ['tools'];
handler.command = ['validarcorreo'];

export default handler;