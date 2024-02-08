import fetch from "node-fetch"

let handler = async(m, {text}) => {
    if (!text) throw 'Por favor ingrese el nombre de la cancion a buscar'

    try {
        let rest = await fetch(`${apikasu}/api/search/spotifyinfo?text=${encodeURIComponent(text)}&apikey=${apikeykasu}`)

        if(!rest.ok) {
            throw new Error (`Error`)
        }

        let json = await rest.json()

        let tracks = json.result

       let response =  "*Resultados*\n\n"

       tracks.forEach((track) => {

       response += `*${track.title}*\n`
       response += `*Artista:* ${track.artist}\n`
       response += `*Album:* ${track.album}\n`
       response += `*Publicado:* ${track.year}\n`
       response += `*Genero:* ${track.genre}\n`
       response += `*Enlace:* ${track.url}\n\n`;})

       await conn.sendFile(m.chat, tracks.thumbnail, 'Thumbnail.jpg', response, m);

    } catch (error) {
    console.error(error)
}
}

handler.help = ["spotifysearch"]
handler.tags = ["dl"]
handler.command = ["spotifysearch"]

export default handler





