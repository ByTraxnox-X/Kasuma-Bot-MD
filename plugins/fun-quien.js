let handler=async(e,{conn:n,text:a,participants:t,command:l, command})=>{
    
    if(!a)return e.reply(`*Invente un asunto*
Ejemplo:

${command} es gey?
`);if(a.length<5)return e.reply("*El asunto es muy corto*");
var r=[];t.map(async e=>{r.push(e.id.replace("c.us","s.whatsapp.net"))});
let s=r[Math.floor(Math.random()*r.length)];
await n.sendMessage(e.chat,{text:`@${s.split("@")[0]}`,mentions:[s]})};


handler.help=["quien"]
handler.tags=["fun"]
handler.command=/^(quien)$/i

export default handler;
