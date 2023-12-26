
import fetch from 'node-fetch'
import axios from 'axios'
import { load } from 'cheerio'
let handler = async (m, {text, usedPrefix, command, conn}) => {
if (!text) throw 'ingrese el nombre de la pelicula a buscar'   
let aaaa
let img
try {  
    m.react(rwait) 
aaaa = await searchC(text)
img = 'https://cinefilosoficial.com/wp-content/uploads/2021/07/cuevana.jpg'    
} catch {
aaaa = await searchP(text)    
img = 'https://elcomercio.pe/resizer/RJM30xnujgfmaODGytH1rRVOrAA=/400x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BJ2L67XNRRGHTFPKPDOEQ2AH5Y.jpg'    
}    
if (aaaa == '') throw '*error, no se encontro la pelicula*' 

let res = await aaaa.map((v) => `\t\t*${v.title}*

*Url:* ${v.link}`).join`\n`
let ads = '*Bloqueador de anuncios recomendado:* https://block-this.com/block-this-latest.apk'
m.react(done)
conn.sendMessage(m.chat, { image: { url: img }, caption: ads + res }, {quoted: m})
}
handler.help = ['peli']
handler.tags = ['dl']
handler.command = ['peli', 'pelisplus']
export default handler

const safeLoad = async(url, options = {}) => {
try {
const { data: pageData } = await axios.get(url, options)
const $ = load(pageData) 
return $
} catch (err) {
if (err.response)
throw new Error(err.response.statusText)
throw err }}

async function searchC(query, numberPage = 1) {
const $ = await safeLoad(`https://cuevana3.mu/page/${numberPage}/`, {
params: { s: query }})
const resultSearch = []
$(".results-post > article").each((_, e) => {
const element = $(e)
const title = element.find("header > h2").text()
const link = element.find(".lnk-blk").attr("href")
resultSearch.push({ title: title, link: link })})
return resultSearch }

async function searchP(query, numberPage = 1) { 
const $ = await safeLoad(`${peliplus}`, {
params: { s: query, page: numberPage }})
const resultSearch = []
$("a[class^='Posters']").each((_, e) => {
const element = $(e)
const title = element.find(".listing-content > p").text()
const link = element.attr("href")
resultSearch.push({ title: title,  link: link })})
return resultSearch }
