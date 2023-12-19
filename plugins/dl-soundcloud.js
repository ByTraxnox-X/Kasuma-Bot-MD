import fetch from 'node-fetch';
const handler = async (m, {conn, text}) => {
  if (!text) throw `ingrese el nombre de la cancion`;
  try {
    const res = await fetch(`https://api-v2.soundcloud.com/search/tracks?q=${text}&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX`);
    const json2 = await res.json();
    let permalinkUrl;
    if (json2.collection.length > 0) {
      const randomIndex = Math.floor(Math.random() * json2.collection.length);
      const randomObject = json2.collection[randomIndex];
      permalinkUrl = randomObject.permalink_url;
    } else {
      permalinkUrl = await json2.collection[0].permalink_url;
    }
    m.react(rwait)
    const res2 = await fetch(`https://api.akuari.my.id/downloader/scdl?link=${permalinkUrl}`);
    const json = await res2.json();
    const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${json.link}`)).text();
    const soundcloudt = `\t\t*${json.title}
    
    *URL: ${shortUrl}`;
    await conn.sendFile(m.chat, json.thumb, '', soundcloudt, m);
    m.react(done)
    await conn.sendMessage(m.chat, {audio: {url: json.link}, fileName: `${json.title}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  } catch {
    throw 'ERROR';
  }
};

handler.help = ['cover <cancion>']
handler.tags = ['dl']
handler.command = /^(soundcloud|cover)$/i;
export default handler;