const handler = async (m, {conn}) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    const name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key;
    if (/exec/.test(name)) return;
    return {name, ...val};
  });
  stats = stats.sort((a, b) => b.total - a.total);
  const txt = stats.slice(0, 10).map(({name, total, last}, idx) => {
    if (name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '');
    return `(${idx + 1})\n*Comando:* ${name}\n*utilizado:* ${total}\n*ultimo uso:* ${getTime(last)}`;
  }).join`\n\n`;
  m.reply(`Dashboard *${conn.user.name}*\n\n${txt}`);
};
handler.help = ['infocommand'];
handler.tags = ['owner'];
handler.command = /^infocommand$/i;

handler.owner = true

export default handler;

export function parseMs(ms) {
  if (typeof ms !== 'number') throw '';
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000,
  };
}

export function getTime(ms) {
  const now = parseMs(+new Date() - ms);
  if (now.days) return `${now.days} días atrás`;
  else if (now.hours) return `${now.hours} hace horas`;
  else if (now.minutes) return `${now.minutes} hace minutos`;
  else return `hace un segundo`;
}
