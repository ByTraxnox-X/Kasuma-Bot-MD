const handler = async (m, {conn}) => {
  conn.adivina_la_cancion = conn.adivina_la_cancion ? conn.adivina_la_cancion : {};
  const id = m.chat;
  if (!(id in conn.adivina_la_cancion)) throw false;
  const json = conn.adivina_la_cancion[id][1];
  const uwukasuma = json.respuestas_kasumabot;
  const adivina_la_cancion_pista = uwukasuma.replace(/[bcdfghjklmnñpqrstvwxyzBCDEFGHJKLMNÑPQRSTVWXYZ]/g, '_');
  m.reply('' + adivina_la_cancion_pista + '');
};
handler.command = /^hint|pista$/i;
export default handler;