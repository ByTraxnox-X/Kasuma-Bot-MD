import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['593995668111', 'Guillermo', true],
  ['573014953662', 'Sebastian', false],

global.你你 = 'a'
global.奇 = 'S'
global.لان = 'p'
global.你 = 'e'
global.الس = 'D'
global.好 = 'b'
global.卡 = 's'
global.م = 'l'
global.جا = 'o'
global.洛 = 'n'
global.ا = 'v'
global.美 = 'ti

] //Numeros de owner 

global.mods = ['']
global.prems = ['', '', '']
global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz',
  KasuApi: 'https://apikasu.onrender.com',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://apikasu.onrender.com': `${${奇}${你}${好}${你你}${卡}${美}${你你}${洛}${الس}${你}${ا}${你}${م}${جا}${لان}}`,
  'https://zenzapis.xyz': '675e34de8a',
  'https://api.fgmods.xyz': 'Rex6QGQI'
}

// CONEXION CON CODIGO DE 8 DIGITOS

global.KasumaCode = "" 
global.confirmCode = ""


// KASU API
global.apikasu = "https://apikasu.onrender.com"
global.apikeykasu = `${${奇}${你}${好}${你你}${卡}${美}${你你}${洛}${الس}${你}${ا}${你}${م}${جا}${لان}}`

//APIS
global.tiktokkey = ['GIf4o4qJ']
global.soundcloudID = ["iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX"]
global.apikeyocr = ["8e65f273cd88957"]
global.githubapi = ["https://api.github.com/repos"]
global.drop = ["https://dropmail.me"]
global.dropmail = ["https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D"]
global.apiocr = ["https://api.ocr.space"]
global.api2 = ["https://api-brunosobrino.onrender.com"]
global.soundcloud = ["https://api-v2.soundcloud.com"]
global.lolhuman = ["https://api.lolhuman.xyz"]
global.akuari = ["https://api.akuari.my.id"]
global.xnxx = ["xnxx.com"]
global.tunyurl = ["https://tinyurl.com"]
global.peliplus = ["https://pelisplushd.cx/search/"]
global.apiconversion = ["https://api.exchangerate-api.com"]
global.conversiondocs = ["https://www.easymarkets.com/int/es/learn-centre/discover-trading/currency-acronyms-and-abbreviations/"]

// Sticker WM
global.packname = 'Kasuma-Bot'
global.author = 'Kasuma-Bot 2.0'
global.waig = 'Sígueme en Instagram\nhttps://www.instagram.com/traxnox/\n'
global.wagp = 'https://chat.whatsapp.com/HvbqkYZlJzYLhczPhDteMt'
global.wagit = 'https://github.com/ByTraxnox-X/KasumaBot-MD'
global.wayt = 'https://youtube.com/@by_traxnox'
global.wapyp = 'https://paypal.me/txpaying?country.x=CO&locale.x=es_XC'

global.fglog = 'https://i.imgur.com/mWHCPIe.jpg'
global.numero = ['593995668111']
global.wait = 'Cargando'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌'
global.xmoji = '🔥'

global.multiplier = 69
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
