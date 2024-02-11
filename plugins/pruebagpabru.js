import fs = from 'fs';

let isOpen=true, openHour='08:00', closeHour='18:00';

const toggleGroup=async(m,a,h,d)=>{const s={abrirauto:'not_announcement',cerrarauto:'announcement'};isOpen=a==='abrirauto';conn.groupSettingUpdate(m.chat,s[a]);m.reply(`Grupo ${isOpen?'abierto':'cerrado'} a las ${h} los días ${d}.`);};

const handler=async(m,{args,isAdmin,isOwner,usedPrefix,command})=>{if(!isAdmin&&!isOwner)return m.reply('Este comando es solo para administradores y propietarios.');if(args.length<3)return m.reply(`Uso correcto: ${usedPrefix}${command} abrirauto/cerrarauto|hora|días`);const[a,h,d]=args.join(' ').split('|').map(arg=>arg.trim());if(['apertura','cierre'].includes(a.toLowerCase())){if(args.length!==3)return m.reply(`Uso correcto: ${usedPrefix}${command} apertura/cierre|hora`);const t=args[2];if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(t))return m.reply('Formato de hora no válido. Utiliza HH:mm (por ejemplo, 08:00).');if(a.toLowerCase()==='apertura')openHour=t;else closeHour=t;return m.reply(`Hora de ${a.toLowerCase()} configurada a las ${t}.`);}toggleGroup(m,a,h,d);fs.writeFileSync('informacion_grupo.json',JSON.stringify({a,h,d}));};

setInterval(()=>{const n=new Date(),h=n.getHours(),m=n.getMinutes();if(!isOpen&&h===parseInt(openHour.split(':')[0])&&m===parseInt(openHour.split(':')[1]))toggleGroup(null,'abrirauto',openHour,'todos los días');else if(isOpen&&h===parseInt(closeHour.split(':')[0])&&m===parseInt(closeHour.split(':')[1]))toggleGroup(null,'cerrarauto',closeHour,'todos los días');},60000);

handler.help=['name','configurarhora'];
handler.tags=['name','configurarhora'];
handler.command=['abrirauto','cerrarauto','configurarhora','confhora'];

export default handler;
