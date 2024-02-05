import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  conn.reply(m.chat, 'Buscando información...', m);

  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();

    const user = data.results[0];
    const {
      name: { title, first, last },
      location: {
        street: { number, name },
        city,
        state,
        country,
        postcode,
        coordinates: { latitude, longitude },
        timezone: { offset, description }
      },
      email,
      login: { uuid, username, password, salt, md5, sha1, sha256 },
      dob: { date, age },
      registered: { date: registeredDate, age: registeredAge },
      phone,
      cell,
      id: { name: idName, value: idValue },
      picture: { large },
      nat
    } = user;

    const full_name = `${first} ${last}`;

    const userInfo = `*Título:* ${title}\n*Nombre:* ${first}\n*Apellido:* ${last}\n*Nombre completo:* ${full_name}\n\n` +
      `*Ubicación:*\n*Número de calle:* ${number}\n*Nombre de calle:* ${name}\n*Ciudad:* ${city}\n*Estado:* ${state}\n*País:* ${country}\n*Código postal:* ${postcode}\nLatitud:* ${latitude}\nLongitud:* ${longitude}\n*Desfase horario:* ${offset}\n*Descripción de la zona horaria:* ${description}\n\n` +
      `*Correo electrónico:* ${email}\n\n` +
      `*Información de inicio de sesión:*\n*UUID:* ${uuid}\n*Nombre de usuario:* ${username}\n*Contraseña:* ${password}\n*Salt:* ${salt}\n*MD5 Hash:* ${md5}\n*SHA1 Hash:* ${sha1}\n*SHA256 Hash:* ${sha256}\n\n` +
      `*Fecha de nacimiento:* ${date}\n*Edad:* ${age}\n\n` +
      `*Información de registro:*\n*Fecha de registro:* ${registeredDate}\n*Edad al registrarse:* ${registeredAge}\n\n` +
      `*Número de teléfono:* ${phone}\n*Número de celular:* ${cell}\n\n` +
      `*Nombre de identificación:* ${idName}\n*Valor de identificación:* ${idValue}\n\n` +
      `*Imagen grande:* ${large}\n\n` +
      `*Nacionalidad:* ${nat}`;

    const imageBuffer = await (await fetch(large)).buffer();

    conn.sendFile(m.chat, imageBuffer, 'randomuser.jpg', `A continuación se muestra la información del usuario aleatorio:\n\n${userInfo}`, m);
  } catch (error) {
    conn.reply(m.chat, 'Lo siento, ocurrió un error. Por favor, inténtalo de nuevo más tarde.', m);
    console.error(error);
  }
};

handler.help = ['informacionrandom'];
handler.tags = ['tools'];
handler.command = /^(informacionrandom|randuser|ruser|ranuser|rauser|rndmusr)$/i;

export default handler;
