const request =require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
    encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY'
    +'W1pbjc2Z2giLCJhIjoiY2p5dzMzbW4wMHRudTNjcGg4d'+
    'WNkcHJrMyJ9.y_d4z7I9kL2TkJHsMT_WKA&limit=1&language=tr'

    request ({url, json:true} , (error,{body})=> {
        if(error){
            callback( 'Geocode servisine bağlanamıyor.' , undefined )
        }else if (body.features.length === 0) {
            callback('Aradığınız şehir bulunamadı !', undefined)
        }else{
            callback(undefined , {
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0] ,
                location : body.features[0].place_name

            }
        )
        }
    })

}

module.exports = geocode