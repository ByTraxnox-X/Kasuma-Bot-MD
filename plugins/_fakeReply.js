
import fetch from 'node-fetch'
export async function before(m,{conn }) {
	
	let who = m.sender ? m.sender : conn.user.jid && conn.user.jid ? conn.user.jid : '0@s.whatsapp.net'
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/Ta0uvwJ.jpg')
	
	//reply link wa
   global.rpl = { contextInfo: { externalAdReply: { mediaUrl: wagp, mediaType: 'VIDEO', description: '', title: packname, body: '', thumbnailUrl: pp, sourceUrl: wagp }}} 
	
	//reply link PayPal
    global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: wapyp, mediaType: 'VIDEO', description: '', title: '', body: '', thumbnailUrl: pp, sourceUrl: wapyp }}}
    
    //reply Instagram 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: waig, mediaType: 'VIDEO', description: '', title: '', body: '', thumbnailUrl: pp, sourceUrl: waig }}} 
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: wayt, mediaType: 'VIDEO', description: '' + wayt, title: '', body: '', thumbnailUrl: pp, sourceUrl: wayt }}}

}
