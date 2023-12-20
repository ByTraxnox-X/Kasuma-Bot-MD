
import { tmpdir } from 'os';
import path, { join } from 'path';
import fs from 'fs';
import { readdirSync, unlinkSync, rmSync } from 'fs';

let handler = async (m, { conn, __dirname, args }) => {

  m.reply(`Se limpió la carpeta *tmp + sessions*`);
  m.react(done);
  // -- eliminar archivos temporales ---
  const tmpDirs = [tmpdir(), join(__dirname, '../tmp')];
  const tmpFiles = [];
  tmpDirs.forEach((dir) => readdirSync(dir).forEach((file) => tmpFiles.push(join(dir, file))));
  tmpFiles.forEach((file) => unlinkSync(file));

  // -- eliminar sesiones del bot ---
  const Sessions = "./sessions";
  readdirSync(Sessions).forEach((file) => {
    if (file !== 'creds.json') {
      unlinkSync(`${Sessions}/${file}`, { recursive: true, force: true });
    }
  });



//--
};
handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp)$/i;

handler.rowner = true;

export default handler;
