const request = require('request');


const forecast = (latitude,longitude,callback) => {
const url = 'https://api.darksky.net/forecast/'
+'ac1133cb6c0a8f37cc0c93db6635fb26/'+encodeURIComponent(latitude) +
','+encodeURIComponent(longitude) +'?lang=tr&units=si'
request ({url , json:true} , (error,{body})=>{
if(error){
callback('weather servisine bağlanamıyor', undefined)
}else if(body.error) {
callback('lokasıyon bulunmadı .' , undefined)
}else{
callback(undefined ,  body.daily.data[0].summary +   
    'Şuanda ' + body.currently.temperature 
   +' derece ve  ' + body.currently.precipProbability +
   '% yağmur yağma ihtimalı var.')
}
})
}

module.exports = forecast
