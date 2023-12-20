import fs from "fs";
let handler = async (m, {args, text, usedPrefix, command}) => {
  let info = `${usedPrefix + command} Antiguo nombre | Nuevo nombre
Ejemplo
${usedPrefix + command} banco-depositar | banco-dep

no use la palabra .js al final de el nombre y no agregue espacios`;
  if (!args[0]) throw info;
  if (!args[1] == "|")
    throw `Ejemplo:
${usedPrefix + command} banco-depositar | banco-dep`;
  if (!args[2])
    throw `Ejemplo:
${usedPrefix + command} banco-depositar | banco-dep`;

  let from = args[0];
  let to = args[2];

  let ar = Object.keys(plugins);
  let ar1 = ar.map((v) => v.replace(".js", ""));
  if (!ar1.includes(args[0])) return m.reply(`Plugin no existente\n${ar1.map((v) => " " + v).join`\n`}`);
  await fs.renameSync(`./plugins/${from}.js`, `./plugins/${to}.js`);
  conn.reply(m.chat, `Exitoso "plugins/${from}.js" a "plugins/${to}.js"`, m);
};
handler.help = ["renameplugin"].map((_) => _ + " nombre antiguo | nombre nuevo");
handler.tags = ["owner"];
handler.command = /^(r(ename(file)?|f)|renameplugin)$/i;
handler.owner = true

export default handler;
