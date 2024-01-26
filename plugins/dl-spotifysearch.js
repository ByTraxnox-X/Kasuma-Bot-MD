import fetch from "node-fetch"

let handler = async(m, {text}) => {
    if (!text) throw 'Por favor ingrese el nombre de la cancion a buscar'

    try {
        let rest = await fetch(`https://api.cafirexos.com//api/spotifysearch?text=${encodeURIComponent(text)}`)

        if(!rest.ok) {
            throw new Error (`Error`)
        }

        let json = await rest.json()

        let tracks = json.spty.resultado.slice(0,2)

       let response =  "*Resultados*\n\n"

       tracks.forEach((track, index) => {

       response += `*${track.title}*\n`
       response += `*Artista:* ${track.artists}\n`
       response += `*Duracion:* ${track.duration} Segundos\n`
       response += `*Enlace:* ${track.link}\n\n`;})

       m.reply(response)

    } catch (error) {
    console.error(error)
}
}

handler.help = ["spotifysearch"]
handler.tags = ["dl"]
handler.command = ["spotifysearch"]

export default handler





