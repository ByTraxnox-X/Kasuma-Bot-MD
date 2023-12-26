import fetch from 'node-fetch';
const handler = async (m, {conn, text}) => {
  if (!text) throw `ingrese el nombre de la cancion`;
  try {
    const res = await fetch(`${soundcloud}/search/tracks?q=${text}&client_id=${soundcloudID}`);
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
    const res2 = await fetch(`${akuari}/downloader/scdl?link=${permalinkUrl}`);
    const json = await res2.json();
    const shortUrl = await (await fetch(`${tunyurl}/api-create.php?url=${json.link}`)).text();
    const soundcloudt = `*${json.title}*
    
    *URL:* ${shortUrl}`;
    await conn.sendFile(m.chat, json.thumb, '', soundcloudt, m);
    m.react(done)
    await conn.sendMessage(m.chat, {audio: {url: json.link}, fileName: `${json.title}.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  } catch {
    throw 'ERROR';
  }
};

handler.help = ['soundcloud <cancion>']
handler.tags = ['dl']
handler.command = /^(soundcloud|cover)$/i;
export default handler;