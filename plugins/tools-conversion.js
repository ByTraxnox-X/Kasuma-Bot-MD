import fetch from 'node-fetch';

async function convertCurrency(fromCurrency, toCurrency, amount) {
  const apiKey = 'b012d0c9ad74993201acdec1'; 

  const apiUrl = `${apiconversion}/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.rates && data.rates[toCurrency]) {
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = amount * exchangeRate;
      return `${amount} ${fromCurrency} equivale a ${convertedAmount} ${toCurrency}`;
    } else {
      return 'No se encontró la tasa de cambio para las monedas especificadas.';
    }
  } catch (error) {
    return 'Se produjo un error al obtener las tasas de cambio.';
  }
}

let handler = async (m, { text }) => {
  const [fromCurrency, toCurrency, amount] = text.split(' ');

  if (fromCurrency && toCurrency && amount) {
    const result = await convertCurrency(fromCurrency, toCurrency, parseFloat(amount));
    m.reply(result);
  } else {
    m.reply('Utiliza el formato correcto: *MonedaDeOrigen* *MonedaDeDestino* Cantidad');
    m.reply(`*Ingrese a:* ${conversiondocs} para conocer los *formatos de monedas*`)
  }
}

handler.help = ['convertirmoneda'];
handler.tags = ['tools'];
handler.command = /^convertirmoneda$/i;

export default handler;
