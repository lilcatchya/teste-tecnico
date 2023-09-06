const csvtojson = require('csvtojson');

module.exports = async function converteCSV(req) {
  try {
    const buffer = req.toString('utf-8')
    const jsonArray = await csvtojson().fromString(buffer);

    console.log('Arquivo CSV enviado e convertido para JSON com sucesso!')

    return jsonArray
  } catch (error) {

    return res.status(500).send('Erro ao processar o arquivo CSV.');
  }
}